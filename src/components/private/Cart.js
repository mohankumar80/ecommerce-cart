import axios from 'axios';
import React from 'react';
import cart_empty from "../../assests/cart_empty.png";
import useAuth from '../../context/auth-context/useAuth';
import { useCart } from "../../context/cart-context/cart-context"

export default function Cart() {
    const { state: { cartItems }, dispatch } = useCart();
    const { userLoggedIn, userDetails } = useAuth();
    const userId = userDetails?._id;

    const totalItems = (acc, value) => {
        return acc += value.quantity;
    }

    const totalPrice = (acc, value) => {
        return acc += value.price * value.quantity
    }

    const removeFromCart = async (cartItem) => {
        try {
            const response = await axios.delete(`https://ecommerce-cart-backend.herokuapp.com/user/cart/${cartItem._id}`, {
                data: {
                    userId
                }
            })
            if(response.data.success) {
                dispatch({ type: "REMOVE_FROM_CART", payload: cartItem })
            }
        } catch (error) {
            console.log("failed to remove from cart", error)
        }
    }

    const incrementItemQuantity = async (cartItem) => {
        try {
            const response = await axios.put(`https://ecommerce-cart-backend.herokuapp.com/user/cart/${cartItem._id}/${cartItem.quantity}`, {
                "userId": userId
            })
            if(response.data.success) {
                dispatch({ type: "INCREMENT_ITEMS", payload: cartItem })            }
        } catch (error) {
            console.log("failed to increase the product quantity from cart", error)
        }
    }

    const decrementItemQuantity = async (cartItem) => {
        try {
            const response = await axios.patch(`https://ecommerce-cart-backend.herokuapp.com/user/cart/${cartItem._id}/${cartItem.quantity}`, {
                "userId": userId
            })
            if(response.data.success) {
                dispatch({ type: "DECREMENT_ITEMS", payload: cartItem })
            }
        } catch (error) {
            console.log("failed to decrease the product quantity from cart", error)
        }
    }

    return (
        <div className="cart">
            {cartItems.length === 0
                ? <>
                    <h2 className="text-align-center">Cart is Empty!!!</h2>
                    <img src={cart_empty} className="img-fluid" alt="empty cart" />
                </>
                : <div className="cart-container">
                    <div className="cards-container">
                        {cartItems.map(item => {
                            return <div key={item._id} className="card">
                                <img className="card-img" src={item.url} alt={item.name} />
                                <div className="card-body">
                                    <h2 className="card-title">{item.name}</h2>
                                    <p className="card-text">by {item.author}</p>
                                    <p className="card-text">---{item.category}</p>
                                    <p>Rs.{item.price}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <button className="btn btn-primary" onClick={
                                        () => {
                                            if(userLoggedIn) {
                                                incrementItemQuantity(item)
                                            }
                                        }
                                    }> + </button>
                                    <button className="btn btn-secondary" onClick={
                                        () => {
                                            if(userLoggedIn) {
                                                decrementItemQuantity(item)
                                            }
                                        }
                                    }> - </button>
                                    <button className="btn btn-primary" onClick={
                                        () => {
                                            if(userLoggedIn) {
                                                removeFromCart(item)
                                            }
                                        }
                                    }> remove </button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="total-price-container">
                        <h2>Cart Total:</h2>
                        <p>No. of Items: {cartItems.reduce(totalItems, 0)}</p>
                        <p>Total Price: Rs.{cartItems.reduce(totalPrice, 0)}</p>
                    </div>
                </div>}
        </div >
    )
}
