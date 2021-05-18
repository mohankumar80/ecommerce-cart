import React, { useReducer } from 'react'
import { ProductsDB } from "./ProductsDB";
import ProductCard from "./ProductCard";
import filterReducer from "../context/filter-reducer";

import "../styles.css";

export default function ProductListing() {

    const [{ sortBy, showFastDelivery, showAllInventory }, dispatch] = useReducer(filterReducer, { sortBy: null, showFastDelivery: false, showAllInventory: false })

    function getSortedData(productData, sortBy) {
        if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
            return productData.sort((a, b) => b.price - a.price)
        }

        if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
            return productData.sort((a, b) => a.price - b.price)
        }
        return productData;
    }

    function getFilteredData(productList, { showFastDelivery, showAllInventory }) {

        return productList.filter(productItem => showFastDelivery ? productItem.fastDelivery : true).filter(productItem => showAllInventory ? productItem : productItem.inStock)

    }

    const sortedData = getSortedData(ProductsDB, sortBy);
    const filteredData = getFilteredData(sortedData, { showFastDelivery, showAllInventory })

    return (
        <div className="products-container">
            <div className="products-filters">
                <fieldset>
                    <legend>Sort By</legend>
                    <label>
                        <input type="radio" name="sort" onChange={() => dispatch({ type: "SORTBY", payload: "PRICE_HIGH_TO_LOW" })} />
                        Price - High to Low
                    </label>
                    <label>
                        <input type="radio" name="sort" onChange={() => dispatch({ type: "SORTBY", payload: "PRICE_LOW_TO_HIGH" })} />
                        Price - Low to High
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Filter By</legend>
                    <label>
                        <input type="checkbox" onChange={() => dispatch({ type: "TOOGLE_DELIVERY" })} />
                        Fast Delivery
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => dispatch({ type: "TOOGLE_INVENTORY" })} />
                        Include Out of Stock
                    </label>
                </fieldset>
            </div>
            <div className="product-cards" >
                {filteredData.map(item => {
                    return (
                        <ProductCard key={item.id} item={item} />
                    );
                })}
            </div>
        </div>
    )
}
