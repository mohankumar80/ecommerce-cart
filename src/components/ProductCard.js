import { useCart } from '../context/cart-context/cart-context';
import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const { state: { cartItems }, dispatch } = useCart();
    const { item: { id, url, name, author, category, price, inStock } } = props;

    return (
        <div className="card" key={id} style={inStock ? { cursor: "pointer" } : { backgroundColor: "#CBD5E1", cursor: "not-allowed" }
        }>
            <img src={url} alt={name} className="card-img" />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">by {author}</p>
                <p className="card-text">---{category}</p>
                <p className="card-text">Rs.{price}</p>
                {
                    cartItems.findIndex(item => item.id === id) === -1
                        ? <button
                            disabled={inStock ? false : true}
                            style={inStock ? null : { cursor: "not-allowed" }}
                            className="btn btn-primary"
                            onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id, url, name, author, category, price, quantity: 1 } })}
                        > Add to Cart </button>
                        : <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
                }
                <button
                    className="btn btn-secondary"
                    onClick={() => dispatch({ type: "ADD_TO_WISHLIST", payload: { id, url, name, author, category, price, quantity: 1, inStock } })}
                >Add to Wishlist</button>
            </div>
        </div >
    )
}