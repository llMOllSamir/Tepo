import { configureStore } from "@reduxjs/toolkit";
import product from "./slices/productSlics";
import category from "./slices/categoriesSlice";
import darkMood from "./slices/darkMoodSlice";
import lang from "./slices/langSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    product,
    category,
    darkMood,
    lang,
    cart,
  },
});
