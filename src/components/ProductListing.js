import React, { useReducer } from 'react'
import ProductCard from "./ProductCard";
import filterReducer from "../context/filter-reducer";
import Filters from "./Filters"

import "../styles.css";

export default function ProductListing({ products }) {


    const [{ sortBy, showFastDelivery, showAllInventory, showSearchedItems, maxRange }, dispatch] = useReducer(filterReducer, { sortBy: null, showFastDelivery: false, showAllInventory: false, showSearchedItems: null, maxRange: 1200 })

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
        return productList.filter(productItem => showFastDelivery ? productItem.fastDelivery : true)
        .filter(productItem => showAllInventory ? productItem : productItem.inStock)
    }

    function getSearchedData(productsData, showSearchedItems) {
        if(showSearchedItems) {
            return productsData.map(item => 
                item.name.toLowerCase().includes(showSearchedItems.toLowerCase()) ? item : undefined
            ).filter(item => item !== undefined)
        } return productsData;
    }

    const getRangeData = (productsData, range) => {
        return productsData.filter(item => item.price <= Number(range))
    }

    const sortedData = getSortedData(products, sortBy);
    const filteredData = getFilteredData(sortedData, { showFastDelivery, showAllInventory })
    const rangeData = getRangeData(filteredData, maxRange )
    const searchedData = getSearchedData(rangeData, showSearchedItems )

    return (
        <div>
            <div className="search-container">
                <input type="text" placeholder="search ..." className="input input-styled" onChange={(e) =>  dispatch({type: "SEARCH", payload: e.target.value})} />
            </div>
            <div className="products-container">
                <div>
                    <Filters dispatch={dispatch} />
                    <label>
                        Max Price: {maxRange}
                        <br />
                        <input type="range" value={maxRange} min="0" max="1200" onChange={(e) => dispatch({ type: "SET_MAX_RANGE", payload: e.target.value })} />
                    </label>
                </div>
                <div className="product-cards" >
                    {searchedData.map(item => {
                        return (
                            <ProductCard key={item._id} item={item} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}