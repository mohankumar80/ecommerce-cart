import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from "../context/auth-context/useAuth"

export default function Login() {
    const { setuserLoggedIn, setuserDetails } = useAuth();
    const [ formDetails, setformDetails ] = useState({ username: "", password: "" })

    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const userLogin = JSON.parse(localStorage?.getItem("login"))
        const user = JSON.parse(localStorage?.getItem("details"));
        userLogin?.isUserLoggedIn && setuserLoggedIn(true)
        user && setuserDetails(user)
        if(userLogin) {
            navigate(state?.from ? state.from : "/login")
        }
    }, [setuserLoggedIn, navigate, state, setuserDetails])

    const loginHandler = async(e) => {
        e.preventDefault()
        const { username, password } = formDetails;
        const response = await axios.post("https://ecommerce-backend.purammohanmohan.repl.co/user/login", {
            "username": username,
            "password": password
        })
        if(response && response.data.success) {
            setuserDetails(response.data.user)
            setuserLoggedIn(true)
            localStorage?.setItem("login", JSON.stringify({isUserLoggedIn: true}))
            localStorage?.setItem("details", JSON.stringify({_id: response.data.user._id}))
        }
        navigate(state?.from ? state.from : "login")
    }

    const usernameHandler = e => {
        const username = e.target.value;
        setformDetails(details => {
            return {...details, username}
        })
    }

    const passwordHandler = e => {
        const password = e.target.value;
        setformDetails(details => {
            return {...details, password}
        })
    }

    return (
        <div className="Login">
            <div className="login-container">
                <form onSubmit={loginHandler} className="login-sub-container">
                    <input type="text" onChange={usernameHandler} className="input-styled" placeholder="username" />
                    <input type="password" onChange={passwordHandler} className="input-styled" placeholder="password" />
                    <button type="submit" className="btn btn-primary btn-login">
                        login
                    </button>
                </form>
                <div className="signup-container">
                    <Link to="/signup" className="btn btn-secondary btn-signup text-align-center" state={{ from: state?.from }}> Sign up </Link>
                </div>
            </div>
        </div>
    )
}
