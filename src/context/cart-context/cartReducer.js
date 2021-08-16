export default function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, cartItems: [...state.cartItems, action.payload]
            }
        case "INCREMENT_ITEMS":
            return {
                ...state, cartItems: state.cartItems.map(item => item._id === action.payload._id ? {
                    ...item,
                    quantity: item.quantity + 1
                } : item)
            }
        case "DECREMENT_ITEMS":
            if (action.payload.quantity === 1) {
                return { ...state, cartItems: state.cartItems.filter(cartItem => cartItem._id !== action.payload._id) }
            } return {
                ...state, cartItems: state.cartItems.map(item => item._id === action.payload._id ? {
                    ...item,
                    quantity: item.quantity - 1
                } : item)
            }
        case "REMOVE_FROM_CART":
            return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload._id) }

        /** wishlist functions*/
        case "MOVE_TO_CART":
            if (state.cartItems.findIndex(item => item._id === action.payload._id) === -1) {
                return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }], wishList: state.wishList.filter(item => item._id !== action.payload._id) }
            } return { ...state, wishList: state.wishList.filter(item => item._id !== action.payload._id) }
        case "ADD_TO_WISHLIST":
            if (state.wishList.findIndex(item => item._id === action.payload._id) === -1) {
                return { ...state, wishList: [...state.wishList, action.payload] }
            } return { ...state }
        case "REMOVE_FROM_WISHLIST":
            return { ...state, wishList: state.wishList.filter(wishListItem => wishListItem._id !== action.payload._id) }
        case "CLEAR_WISHLIST":
            return { ...state, wishList: [] }
        default:
            console.log("something broke...!!");
            return state;
    }
}