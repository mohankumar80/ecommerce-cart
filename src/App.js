import React from "react";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import Home from "./components/Home";
import ProductListing from "./components/ProductListing"
import Cart from "./components/Cart";
import WishList from "./components/WishList";

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