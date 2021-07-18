import React, { useState } from "react";
import { AuthContext } from "./auth-context";
import fakeAuthApiCall from "../../fakeAuthApiCall";

const AuthProvider = ({children}) => {
    const [userLoggedIn, setuserLoggedIn] = useState(false)

    const loginUserWithCredentials = async (username, password) => {
        try {
            const response = await fakeAuthApiCall(username, password);
            if(response.success) {
                return response
            }
        } catch(error) {
            console.log("error occured", error)
        }
    }

    return <AuthContext.Provider value={{ userLoggedIn, setuserLoggedIn, loginUserWithCredentials  }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;