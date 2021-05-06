import minion from "../assests/minion.jpg";
import { useCart } from '../context/cart-context';
import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const { state: { cartItems }, dispatch } = useCart();
    const { item: { id, name, price } } = props;

    return (
        <div className="card" key={id}>
            <img src={minion} alt="" />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">Rs.{price}</p>
                {
                    cartItems.findIndex(item => item.id === id) === -1
                        ? <button
                            className="btn btn-primary"
                            onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id, minion, name, price, quantity: 1 } })}
                        > Add to Cart </button>
                        : <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
                }
                <button
                    className="btn btn-secondary"
                    onClick={() => dispatch({ type: "ADD_TO_WISHLIST", payload: { id, minion, name, price, quantity: 1 } })}
                > Add to WishList </button>
            </div>
        </div >
    )
}