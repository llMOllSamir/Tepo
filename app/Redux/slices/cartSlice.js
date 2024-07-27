import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
};

export const userCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    checkCart: (state) => {
      if (localStorage.getItem("cartList")) {
        state.cartList = JSON.parse(localStorage.getItem("cartList"));
      }
    },
    addToCartOffline: (state, action) => {
      let product = state.cartList.find(
        (product) => product._id === action.payload._id
      );
      if (product) {
        product.order++;
      } else {
        state.cartList.push({ ...action.payload, order: 1 });
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    removeFromCartOffline: (state, action) => {
      let product = state.cartList.findIndex(action.payload);
      if (product >= 0) {
        state.cartList.splice(product, 1);
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
      }
    },
  },
});
export const { checkCart, addToCartOffline, removeFromCartOffline } =
  userCart.actions;

export default userCart.reducer;
