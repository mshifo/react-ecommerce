import { createSlice } from "@reduxjs/toolkit";
import { addToShoppingCart } from "../../utils";

const initialState = {
    cartProducts: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const shoppingCart = addToShoppingCart(action.payload, state.cartProducts);
            state.cartProducts = shoppingCart;
        },
        clearCart: (state) => {
            state.cartProducts = [];
        },
        removeFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(el => el.id != action.payload);
        }
    }
})

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions
export const selectCart = ({ cart }) => cart;
export default cartSlice.reducer