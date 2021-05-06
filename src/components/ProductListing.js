import React from 'react'
import { ProductsDB } from "./ProductsDB";
import ProductCard from "./ProductCard";

import "../styles.css";

export default function ProductListing() {
    return (
        <div className="products-container">
            <div className="products-filters">
                <fieldset>
                    <legend>Sort By</legend>
                    <label>
                        <input type="radio" name="sort" />
                        Price - High to Low
                    </label>
                    <label>
                        <input type="radio" name="sort" />
                        Price - Low to High
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Filter By</legend>
                    <label>
                        <input type="checkbox" name="sort" />
                        Fast Delivery
                    </label>
                    <label>
                        <input type="checkbox" name="sort" />
                        Out of Stock
                    </label>
                </fieldset>
            </div>
            <div className="product-cards" >
                {ProductsDB.map(item => {
                    return (
                        <ProductCard key={item.id} item={item} />
                    );
                })}
            </div>
        </div>
    )
}
