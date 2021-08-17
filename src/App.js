import React, { useEffect, useState } from "react";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { Navigation, Home, ProductListing, Notfound, Login, Signup } from "./components/index";
import { Cart, WishList } from "./components/private/index";
import PrivateRoute from "./PrivateRoute"
import { useCart } from "./context/cart-context/cart-context";
import useAuth from "./context/auth-context/useAuth";

export default function App() {

  const { dispatch } = useCart();
  const { userLoggedIn, userDetails } = useAuth();
  const userId = userDetails?._id;

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get("https://ecommerce-cart-backend.herokuapp.com/products");
        setdata(response.data.products)
      } catch (error) {
        console.log("error while retrieving products", error)
      }
    })()
  }, [])

  
  useEffect(() => {
    if(userLoggedIn) {
      (async function() {
        try {
          const response = await axios.get(`https://ecommerce-cart-backend.herokuapp.com/user/${userId}/cart`);
          const allCartItems = response.data.cart;
          allCartItems.map(cartItem => 
              dispatch({ type: "ADD_TO_CART", payload: cartItem })
          )
        } catch (error) {
          console.log("error occured while retrieving the products from cart", error)
        }
      })()
    }
  }, [userId, dispatch, userLoggedIn])

  useEffect(() => {
    if(userLoggedIn) {
      (async () => {
        try {
          const response = await axios.get(`https://ecommerce-cart-backend.herokuapp.com/user/${userId}/wishlist`);
          const wishlistItems = response.data.wishlist;
          wishlistItems.map(wishItem => 
            dispatch({ type: 'ADD_TO_WISHLIST', payload: wishItem })
          )
        } catch (error) {
          console.log("error occured while retrieving the products from wishlist", error)
        }
      })()
    }
  }, [userId, dispatch, userLoggedIn])

  const [ data, setdata ] = useState();

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="*" element={<Notfound/>} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing products={data} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}