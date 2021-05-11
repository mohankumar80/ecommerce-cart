import React, { useReducer } from 'react'
import { ProductsDB } from "./ProductsDB";
import ProductCard from "./ProductCard";

import "../styles.css";

export default function ProductListing() {

    function filterReducer(state, action) {
        switch (action.type) {
            case "SORTBY":
                return { ...state, sortBy: action.payload }
            case "TOOGLE_DELIVERY":
                return { ...state, showFastDelivery: !state.showFastDelivery }
            case "TOOGLE_INVENTORY":
                return { ...state, showAllInventory: !state.showAllInventory }
            default:
                return state;
        }
    }

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
