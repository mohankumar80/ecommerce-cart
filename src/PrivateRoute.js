import { Route, Navigate } from "react-router-dom";
import useAuth from "./context/auth-context/useAuth";

const PrivateRoute = ({path, ...props}) => {
    const { userLoggedIn } = useAuth();

    return userLoggedIn
    ? <Route path={path} {...props} /> 
    : <Navigate replace to="/login" state={{ from: path }} />
}

export default PrivateRoute;