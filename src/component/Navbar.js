import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css'
export default class Navbar extends Component {
    render() {
        return (
           <nav className="nav navbar-expand-sm navbar-dark px-sm-5">

               <Link to='/'>
                   <img src={logo} alt="store" className="navbar-brand"/>
               </Link>
                <ul className="navbar-nav align-items-center">
                    <li className=" nav-item ml-5">
                        <Link to='/' className='nav-link'>
                            Products
                        </Link>
                    </li>
                </ul>
                <Link to='/cart' className="ml-auto">
                    <button className="button">
                        <i className="fas fa-cart-plus">My Cart</i>
                    </button>
                </Link>
           </nav>
        )
    }
}
