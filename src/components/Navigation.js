import React from 'react';
import { useCart } from '../context/cart-context';

import { NavLink } from "react-router-dom";

import { HiShoppingCart } from "react-icons/hi";
import { FcLike } from "react-icons/fc";


export default function Navigation() {

    const { state: { cartItems, wishList } } = useCart()

    return (
        <div className="Navigation">
            <div className="nav">
                <NavLink activeClassName="navbar-brand" end to="/">One1</NavLink>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink activeClassName="nav-link" to="/products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="nav-link" className="badge-icon" to="/cart">
                            <HiShoppingCart />
                            <span className="badge-hover">{cartItems.length}</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="nav-link" className="badge-icon" to="/wishlist">
                            <FcLike />
                            <span className="badge-hover">{wishList.length}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
