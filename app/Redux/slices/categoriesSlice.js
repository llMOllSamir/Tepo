import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesList: [],
  oneCategroy: {},
  subForCategory: [],
};

/** get  All categories   */
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    let data = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
    data = await data.json();
    return data;
  }
);
/** get One category By ID */

export const getOneCategory = createAsyncThunk(
  "category/getOneCategory",
  async (id) => {
    let data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    data = await data.json();
    return data;
  }
);

/** get sub categories for one category By ID */
export const getSFOC = createAsyncThunk("category/getSFOC", async (id) => {
  let data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  );
  data = await data.json();
  return data;
});
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    emptySubForCategory: (state, action) => {
      state.subForCategory = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, actions) => {
      state.categoriesList = actions.payload.data;
    });
    builder.addCase(getOneCategory.fulfilled, (state, actions) => {
      state.oneCategroy = actions.payload.data;
    });
    builder.addCase(getSFOC.fulfilled, (state, actions) => {
      state.subForCategory = actions.payload.data;
    });
  },
});

export const { emptySubForCategory } = categorySlice.actions;

export default categorySlice.reducer;
