import { useCart } from '../context/cart-context/cart-context';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../context/auth-context/useAuth';
import axios from 'axios';

export default function ProductCard(props) {

    const { userLoggedIn, userDetails } = useAuth();
    const navigate = useNavigate();
    const { state: { cartItems }, dispatch } = useCart();
    const { item: { _id, url, name, author, category, price, inStock, fastDelivery } } = props;

    const userId = userDetails?._id;

    const addToCart = async (_id, url, name, author, category, price, inStock, fastDelivery) => {
        try {
            const response = await axios.post(`https://ecommerce-cart-backend.herokuapp.com/user/cart/${_id}`, {
                "userId": userId
            })
            if(response.data.success) {
                dispatch({ type: "ADD_TO_CART", payload: { _id, url, name, author, category, price, inStock, fastDelivery, quantity: 1 } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addToWishlist = async (_id, url, name, author, category, price, inStock, fastDelivery ) => {
        try {
            const response = await axios.post(`https://ecommerce-cart-backend.herokuapp.com/user/wishlist/${_id}`, {
                "userId": userId
            }) 
            if(response.data.success) {
                dispatch({ type: "ADD_TO_WISHLIST", payload: { _id, url, name, author, category, price, inStock, fastDelivery }})
            }
        } catch (error) {
            console.log("error occured",error)
        }
    }

    return (
        <div className="card" key={_id} style={inStock ? { cursor: "pointer" } : { backgroundColor: "#CBD5E1", cursor: "not-allowed" }
        }>
            <img src={url} alt={name} className="card-img" />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">by {author}</p>
                <p className="card-text">---{category}</p>
                <p className="card-text">Rs.{price}</p>
                {
                    cartItems.findIndex(item => item._id === _id) === -1
                        ? <button
                            disabled={inStock ? false : true}
                            style={inStock ? null : { cursor: "not-allowed" }}
                            className="btn btn-primary"
                            onClick={
                                () => {
                                    if(userLoggedIn) {
                                        addToCart( _id, url, name, author, category, price, inStock, fastDelivery )
                                    } else {
                                        navigate("/login", {state: { from: "/products" }} )
                                    }
                                }
                            }
                        > Add to Cart </button>
                        : <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
                }
                <button
                    className="btn btn-secondary"
                    onClick={
                        () => {
                            if(userLoggedIn) {
                                addToWishlist(_id, url, name, author, category, price, inStock, fastDelivery)
                            } else {
                                navigate("/login", { state: { from: "/products" } })
                            }
                        }
                    }
                >Add to Wishlist</button>
            </div>
        </div>
    )
}