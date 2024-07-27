import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};
export let getProducts = createAsyncThunk(
  "product/getProducts",
  async (page = 1) => {
    let data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    ).then(async (res) => await res.json());
    return data;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productList = action.payload.data;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export default productSlice.reducer;
