import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const formatPrice = (price) => {
  return parseFloat(price.toFixed(2));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice = formatPrice(state.totalPrice + newItem.price);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: formatPrice(newItem.price),
          quantity: 1,
          totalPrice: formatPrice(newItem.price),
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = formatPrice(existingItem.totalPrice + newItem.price);
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      state.totalPrice = formatPrice(state.totalPrice - existingItem.price);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = formatPrice(existingItem.totalPrice - existingItem.price);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
