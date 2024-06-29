import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    additem(state, action) {
      state.cart.push(action.payload);
    },
    deleteitem(state, action) {
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    clearitem(state) {
      state.cart = [];
    },
    incItem(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decItem(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteitem(state, action);
    },
  },
});
export const { additem, clearitem, deleteitem, incItem, decItem } =
  cartSlice.actions;

export default cartSlice.reducer;
