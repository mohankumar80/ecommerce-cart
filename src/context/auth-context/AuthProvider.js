import React, { useState } from "react";
import { AuthContext } from "./auth-context";

const AuthProvider = ({children}) => {
    const [ userLoggedIn, setuserLoggedIn ] = useState(false);
    const [ userDetails, setuserDetails ] = useState();

    return <AuthContext.Provider value={{ userLoggedIn, setuserLoggedIn, userDetails, setuserDetails }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;