export default function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, cartItems: [...state.cartItems, action.payload]
            }
        case "INCREMENT_ITEMS":
            return {
                ...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? {
                    ...item,
                    quantity: item.quantity + 1
                } : item)
            }
        case "DECREMENT_ITEMS":
            if (action.payload.quantity === 1) {
                return { ...state, cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id) }
            } return {
                ...state, cartItems: state.cartItems.map(item => item.id === action.payload.id ? {
                    ...item,
                    quantity: item.quantity - 1
                } : item)
            }
        case "REMOVE_FROM_CART":
            return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id) }
        case "MOVE_TO_CART":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                wishList: state.wishList.filter(wishListItem => wishListItem.id !== action.payload.id)
            }
        case "ADD_TO_WISHLIST":
            return { ...state, wishList: [...state.wishList, action.payload] }
        case "REMOVE_FROM_WISHLIST":
            return { ...state, wishList: state.wishList.filter(wishListItem => wishListItem.id !== action.payload.id) }
        case "CLEAR_WISHLIST":
            return { ...state, wishList: [] }
        default:
            console.log("something broke...!!");
            return state;
    }
}