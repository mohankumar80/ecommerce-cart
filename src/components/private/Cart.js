import React from 'react';
import cart_empty from "../../assests/cart_empty.png";
import { useCart } from "../../context/cart-context/cart-context"

export default function Cart() {
    const { state: { cartItems }, dispatch } = useCart();

    const totalItems = (acc, value) => {
        return acc += value.quantity;
    }

    const totalPrice = (acc, value) => {
        return acc += value.price * value.quantity
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
                            return <div key={item.id} className="card">
                                <img className="card-img" src={item.url} alt={item.name} />
                                <div className="card-body">
                                    <h2 className="card-title">{item.name}</h2>
                                    <p className="card-text">by {item.author}</p>
                                    <p className="card-text">---{item.category}</p>
                                    <p>Rs.{item.price}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <button className="btn btn-primary" onClick={() => dispatch({ type: "INCREMENT_ITEMS", payload: item })}> + </button>
                                    <button className="btn btn-secondary" onClick={() => dispatch({ type: "DECREMENT_ITEMS", payload: item })}> - </button>
                                    <button className="btn btn-primary" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}> remove </button>
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
