import React from 'react'

export default function Filters({ dispatch }) {
    return (
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
    )
}
