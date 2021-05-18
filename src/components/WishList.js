import React from 'react'
import wishlist_empty from "../assests/wishlist_empty.png"
import { useCart } from "../context/cart-context";

export default function WishList() {
    const { state: { wishList }, dispatch } = useCart();

    return (
        <div className="wishlist-container">
            {
                wishList.length === 0
                    ? <div>
                        <h3 className="text-align-center">Your WishList is empty!!<br />Make a Wish &#x1F9E1;!!!</h3>
                        <img className="img-fluid" src={wishlist_empty} alt="wishlist empty" />
                    </div>
                    : <>
                        {wishList.map(wishItem => {
                            return (<div key={wishItem.id} className="card">
                                <img src={wishItem.url} alt={wishItem.name} className="card-img" />
                                <button className="btn btn-icon card-dismiss" onClick={() => dispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishItem })}>&times;</button>
                                <div className="card-body">
                                    <h1 className="card-title">{wishItem.name}</h1>
                                    <p className="card-text">by {wishItem.author}</p>
                                    <p className="card-text">---{wishItem.category}</p>
                                    <button className="btn btn-primary" onClick={() => dispatch({ type: "MOVE_TO_CART", payload: wishItem })}>Move to Cart</button>
                                </div>
                            </div>
                            )
                        })
                        }
                        <button className="btn btn-primary btn-clear-wishlist" onClick={() => dispatch({ type: "CLEAR_WISHLIST" })}>Clear Wishlist</button>
                    </>
            }
        </div>
    )
}
