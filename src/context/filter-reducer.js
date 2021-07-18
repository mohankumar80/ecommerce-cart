export default function filterReducer(state, action) {
    switch (action.type) {
        case "SORTBY":
            return { ...state, sortBy: action.payload }
        case "TOOGLE_DELIVERY":
            return { ...state, showFastDelivery: !state.showFastDelivery }
        case "TOOGLE_INVENTORY":
            return { ...state, showAllInventory: !state.showAllInventory }
        case "SEARCH":
            return { ...state, showSearchedItems: action.payload }
        case "SET_MAX_RANGE":
            return { ...state, maxRange: action.payload }
        default:
            return state;
    }
}