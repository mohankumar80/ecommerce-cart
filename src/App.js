import React from "react";
import "./styles.css";
import { Routes, Route } from "react-router-dom";

import { Navigation, Home, ProductListing, Cart, WishList } from "./components/index";

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}