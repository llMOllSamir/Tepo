import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartList: [],
  status: {
    loading: false,
    status: "idle",
    product: null
  },
  error: null,
};


export const addToCart = createAsyncThunk("cart/addToCart", async (productId) => {
  const res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
    productId
  }, {
    headers: {
      token: JSON.parse(localStorage.getItem("token"))
    }
  })
  return res?.data
})

export const userCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    checkCart: (state, action) => {
      if (localStorage.getItem("cartList")) {
        state.cartList = JSON.parse(localStorage.getItem("cartList"));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.status = {
          loading: true,
          status: "loading",
          product: action.meta.arg
        };
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = {
          loading: false,
          status: "success",
          product: action.meta.arg
        };
        localStorage.setItem("cartList", JSON.stringify(action.payload.data.products));
        state.cartList = [...action?.payload?.data?.products];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { checkCart } = userCart.actions;

export default userCart.reducer;
