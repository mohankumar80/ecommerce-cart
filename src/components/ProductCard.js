import { useCart } from '../context/cart-context';
import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const { state: { cartItems }, dispatch } = useCart();
    const { item: { id, url, name, author, category, price } } = props;

    return (
        <div className="card" key={id}>
            <img src={url} alt={name} />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">by {author}</p>
                <p className="card-text">---{category}</p>
                <p className="card-text">Rs.{price}</p>
                {
                    cartItems.findIndex(item => item.id === id) === -1
                        ? <button
                            className="btn btn-primary"
                            onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id, url, name, author, category, price, quantity: 1 } })}
                        > Add to Cart </button>
                        : <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
                }
                <button
                    className="btn btn-secondary"
                    onClick={() => dispatch({ type: "ADD_TO_WISHLIST", payload: { id, url, name, author, category, price, quantity: 1 } })}
                >Add to Wishlist</button>
            </div>
        </div >
    )
}