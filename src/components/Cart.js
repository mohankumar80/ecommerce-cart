import React from 'react';
import cart_empty from "../assests/cart_empty.png";
import { useCart } from "../context/cart-context";

export default function Cart() {
    const { state: { cartItems }, dispatch } = useCart();

    const totalItems = (acc, value) => {
        return acc += value.quantity;
    }

    const totalPrice = (acc, value) => {
        return acc += value.price * value.quantity
    }

    console.log(cartItems);
    return (
        <div className="cart">
            {cartItems.length === 0
                ? <>
                    <h1 className="text-align-center">Cart is Empty</h1>
                    <img src={cart_empty} className="img-fluid" />
                </>
                : <div>
                    <div className="cards-container">
                        {cartItems.map(item => {
                            return <div key={item.id} className="card">
                                <img src={item.minion} />
                                <div className="card-body">
                                    <h1>{item.name}</h1>
                                    <p>Rs.{item.price}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <button className="btn btn-primary" onClick={() => dispatch({ type: "INCREMENT_ITEMS", payload: item })}> + </button>
                                    <button className="btn btn-secondary" onClick={() => dispatch({ type: "DECREMENT_ITEMS", payload: item })}> - </button>
                                    <button className="btn btn-primary" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}> remove </button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div>
                        <h1>Cart Total:</h1>
                        <p>No. of Items: {cartItems.reduce(totalItems, 0)}</p>
                        <p>Total Price: {cartItems.reduce(totalPrice, 0)}</p>
                    </div>
                </div>}
        </div >
    )
}
