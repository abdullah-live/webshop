// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

const URL = `${config.url.API_URL}/category`; // Adjust the URL based on your API endpoint

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch all categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get(URL);
  return response.data;
});

// Thunk to fetch category names by IDs
export const fetchCategoryNames = createAsyncThunk('categories/fetchCategoryNames', async (categoryIds) => {
  const response = await axios.post(`${URL}/names`, { categoryIds });
  return response.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.items = state.items.filter(category => category.id !== action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoryNames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export const { addCategory, removeCategory, updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
