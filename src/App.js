import React from "react";
import "./styles.css";
import { Routes, Route } from "react-router-dom";

import { Navigation, Home, ProductListing, Notfound, Login } from "./components/index";
import { Cart, WishList } from "./components/private/index";
import PrivateRoute from "./PrivateRoute"

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="*" element={<Notfound/>} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}