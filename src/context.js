import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'
const ProductContext = React.createContext();

 class ProductProvider extends Component {
     state={
         products: [],
         cart:[],
         detailProduct: detailProduct,
         modalProduct:detailProduct,
         modalOpen: false,
         cartSubtotal: 0,
         cartTax:0,
         cartTotal:0
    };

    componentDidMount(){
        this.setProducts();
    }
    setProducts = ()=>{
        let products = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            products = [...products, singleItem];
        });
        this.setState(()=>{
            return {products}
        });
    }

    getItem = id =>{
        const product = this.state.products.find(item=> item.id ===id);
        return product;
    }


    handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })

    };

    addToCart = id =>{
      let tempProducts = [...this.state.products];
      const index = tempProducts.indexOf(this.getItem(id));
      const product = tempProducts[index];
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;

      this.setState(()=>{
          return {products: tempProducts, cart:[...this.state.cart, 
        product] };
          
      },
       ()=>{
          this.addTotals();
       }
      )
    };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct: product, modalOpen: true}
        })
    }

    closeModal =()=>{
        this.setState(()=>{
            return {modalOpen:false};
        })
    }


    increment = id =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id ===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return {cart:[...tempCart]}}, 
        ()=>{
            this.addTotals();
        })

    }

    decrement =id =>{

        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id ===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
       
        if(product.count > 0){
            product.total = product.count * product.price;
        
        }else{
            
            this.removeItem(id);
            
        }
       

        this.setState(()=>{
            return {cart:[...tempCart]}}, 
        ()=>{
            this.addTotals();
        })
    }

    removeItem = id =>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !==id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        console.log(removedProduct);
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        }, ()=>{
            this.addTotals();
        })

    }

    clearCart= () =>{
        this.setState(()=>{
            return {cart:[]};
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = ()=>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax = subTotal * 0.16;
        const tax = parseFloat(tempTax.toFixed(2));
        const tempTotal = subTotal + tax;
        const total = parseFloat(tempTotal.toFixed(2));
        this.setState(()=>{
            return{
                cartSubtotal : subTotal,
                cartTotal:total,
                cartTax: tax

            }
        })
    }


    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal: this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}
            >
              {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};