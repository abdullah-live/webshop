// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';
import { fetchCategoryNames } from './categorySlice'; // Import the category thunk

const URL = `${config.url.API_URL}/product`; // Adjust the URL based on your API endpoint

const initialState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { dispatch }) => {
  const response = await axios.get(URL);
  const products = response.data;
  
  // Extract unique category IDs
  const categoryIds = [...new Set(products.map(product => product.category))];
  
  // Dispatch fetchCategoryNames thunk
  dispatch(fetchCategoryNames(categoryIds));
  
  return products;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
  const response = await axios.get(`${URL}/${productId}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const { addProduct, removeProduct, updateProduct, selectProduct } = productSlice.actions;

export default productSlice.reducer;
