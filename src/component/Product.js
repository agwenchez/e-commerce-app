import React, { Component } from 'react'
// import '../App.css';
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../context'
import styled from 'styled-components';
import PropTypes from 'prop-types';



export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.product
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                <ProductConsumer>
                {value => (
                    <div className="img-container p-5"
                     onClick={()=>
                        value.handleDetail(id)
                     }>

                        <Link to='/details'>
                            <img src={img} alt="product" height={180}  width={160} className="card-image-top" />
                        </Link>
                        <button 
                        className="cart-btn" 
                        disabled={inCart ? true:false} 
                        onClick={()=>{
                            value.addToCart(id);
                            value.openModal(id);
                        }}>
                        {inCart ? (
                            <p className="text-capitalized mb-0" disabled>
                            {""}inCart</p>
                            ):(
                                <i className="fas fa-cart-plus"/>
                            )}

                        </button>
                    </div>
                )}
                    
                    </ProductConsumer>

                    {/* card footer */}
                    <div className="card-footer d-flex justify-content-between">
                        <h4 className=" align-self-center mb-0">
                            {title}
                        </h4>
                        <h3 className=" text-blue font-italic mb-0">
                            <span className="mr-1">$</span>
                            {price}
                        </h3>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

Product.propTypes = {
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

const ProductWrapper = styled.div`
margin-top:50px;
display:flex;
justify-content:center;
flex-wrap: wrap;
width:100%;

.card{
    transition: all 0.5s linear;
    margin-right:5px;
    margin-bottom:5px;
    width:300px;
    height:auto;
    justify-content:center;

}
.card-footer{
    ${'' /* border-top:2px solid var(--lightBlue); */}
    transition: all 0.5s linear;
    background:transparent;
}
&:hover{
    .card{
    border:0.04rem solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
  
    }
    .card-footer{
        background: rgba(247,247,247)  ;
    }
  }
  
.img-container{
    position: relative;
    overflow: hidden;
    padding:auto;
    content-align:center;
    margin-top:20px;
    height:auto;
    width:auto;
    margin-left: 5px;
} 
.card-image-top{
    transition:all 0.5s linear;
    self-align:auto;

}
.img-container:hover .card-image-top{
    transform:scale(1.3);
   
}
.cart-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5rem 0 0 0;
    transform: translate(100%, 100%);
}
.img-container:hover .cart-btn{
    transform: translate(0,0);
    transition:all 0.5s linear;
    
}
`