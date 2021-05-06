import React from 'react'
import { Link } from "react-router-dom";
import books from "../assests/books.jpg";

export default function Home() {
    return (
        <div className="Home">
            <div className="home-container">
                <img src={books} alt="Collection of books" className="img-fluid"/>
                <div className="home-overlay-container">
                    <h1>Wanna know more about the people your admire!!<br />Shop now all your favorite Autobiographies, biographies &#38; Audiobooks</h1>
                    <Link to="/products" className="btn btn-primary btn-shop">Shop Now</Link>
                </div>
            </div>
        </div>
    )
}
