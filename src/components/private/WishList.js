import React from 'react'
import wishlist_empty from "../../assests/wishlist_empty.png"
import { useCart } from "../../context/cart-context/cart-context";
import  useAuth from "../../context/auth-context/useAuth";
import axios from 'axios';

export default function WishList() {
    
    const { userLoggedIn, userDetails } = useAuth();
    const { state: { wishList }, dispatch } = useCart();
    const userId = userDetails?._id;

    const removeFromWishlist = async (item) => {
        try {
            const response = await axios.delete(`https://ecommerce-backend.purammohanmohan.repl.co/user/wishlist/${item._id}`, {
                data: {
                    "userId": userId
                }
            })
            if(response.data.success) {
                dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item })
            }
        } catch (error) {
            console.log('failed to remove the item into wishlist', error)
        }
    }

    const moveToCart = async (wishlistItem) => {
        try {
            await axios.delete(`https://ecommerce-backend.purammohanmohan.repl.co/user/wishlist/${wishlistItem._id}`, {
                data: {
                    "userId": userId
                }
            })
            const response = await axios.post(`https://ecommerce-backend.purammohanmohan.repl.co/user/cart/${wishlistItem._id}`, {
                userId
            })
            if(response.data.success) {
                dispatch({ type: "MOVE_TO_CART", payload: wishlistItem })
            }
        }  catch (error) {
            console.log('failed to move the item into cart', error)
        }
    }

    const clearWishlist = async () => {
        try {
            const response = await axios.delete(`https://ecommerce-backend.purammohanmohan.repl.co/user/${userId}/wishlist`)
            if(response.data.success) {
                dispatch({ type: "CLEAR_WISHLIST" })
            }
        } catch (error) {
            console.log('something went wrong while clearing the wishlist')
        }
    }

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
                            return (<div key={wishItem._id} className="card">
                                <img src={wishItem.url} alt={wishItem.name} className="card-img" />
                                <button className="btn btn-icon card-dismiss" onClick={() => {
                                    if(userLoggedIn) {
                                        removeFromWishlist(wishItem)
                                    }
                                }}
                                >&times;</button>
                                <div className="card-body">
                                    <h1 className="card-title">{wishItem.name}</h1>
                                    <p className="card-text">by {wishItem.author}</p>
                                    <p className="card-text">---{wishItem.category}</p>
                                    {
                                        wishItem.inStock
                                        ? <button className="btn btn-primary" onClick={
                                            () => {
                                                if(userLoggedIn) {
                                                    moveToCart(wishItem)
                                                }
                                            }
                                        }> Move to Cart </button>
                                        : null
                                    }
                                </div>
                            </div>
                            )
                        })
                        }
                        <button className="btn btn-primary btn-clear-wishlist" onClick={
                            () => {
                                if(userLoggedIn) {
                                    clearWishlist()
                                }
                            }
                        }>Clear Wishlist</button>
                    </>
            }
        </div>
    )
}
