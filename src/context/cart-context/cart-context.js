import { createContext, useContext, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

const initialState = {
    cartItems: [],
    wishList: [],
}


export function CartProvider(props) {

    const [state, dispatch] = useReducer(cartReducer, initialState)

    return <CartContext.Provider value={{state, dispatch}}>
        {props.children}
    </CartContext.Provider>
}

