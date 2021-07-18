import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from "../context/auth-context/useAuth"

export default function Login() {
    const { setuserLoggedIn, loginUserWithCredentials } = useAuth();
    const [ formDetails, setformDetails ] = useState({ username: "", password: "" })

    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const userLogin = JSON.parse(localStorage?.getItem("login"))
        userLogin?.isUserLoggedIn && setuserLoggedIn(true)
    }, [setuserLoggedIn])

    const loginHandler = async(e) => {
        e.preventDefault()
        const { username, password } = formDetails;
        const response = await loginUserWithCredentials(username, password)
        if(response && response.success) {
            setuserLoggedIn(true)
            localStorage?.setItem("login", JSON.stringify({isUserLoggedIn: true}))
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
                    <button className="btn btn-secondary btn-signup text-align-center">Sign Up</button>
                </div>
            </div>
        </div>
    )
}
