import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

export default function Signup() {

    const navigate = useNavigate();
    const { state } = useLocation()

    const [userDetails, setuserDetails] = useState({ username: "", password: "" })

    const usernameHandler = (event) => {
        const username = event.target.value;
        setuserDetails(details => {
            return { ...details, username }
        })
    }

    const passwordHandler = (event) => {
        const password = event.target.value;
        setuserDetails(details => {
            return { ...details, password }
        })
    }
    
    const loginHandler = async (event) => {
        event.preventDefault();
        const { username, password } = userDetails;
        try {
            const response = await axios.post("https://ecommerce-cart-backend.herokuapp.com/user/signup", {
                    "username": username,
                    "password": password
            })
            if(response.data.success) {
                toast.success("SignUp successfull !! Please Login")
                navigate("/login", { state: { from: state?.from } })
            }
        } catch (error) {
            console.log("something went while signing up", error)
            toast.error("Something went wrong!! Please try again")
        }
    }


    return (
        <div className="Login">
            <div className="login-container">
                <form onSubmit={loginHandler} className="login-sub-container">
                    <input type="text" onChange={usernameHandler} className="input-styled" placeholder="username" />
                    <input type="password" onChange={passwordHandler} className="input-styled" placeholder="password" />
                    <button type="submit" className="btn btn-primary btn-login">
                        sign up
                    </button>
                </form>
                <div className="signup-container">
                    <Link to="/login" className="btn btn-secondary btn-signup text-align-center"> Login </Link>
                </div>
            </div>
        </div>
    )
}
