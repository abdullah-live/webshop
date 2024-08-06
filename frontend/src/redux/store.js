// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice"; // Import the category reducer
import cartReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer, // Add the category reducer
    cart: cartReducer,
  },
});

export default store;
