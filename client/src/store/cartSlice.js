import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product && x.size === item.size);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product && x.size === existItem.size ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.isOpen = true; // Auto open drawer on add
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload.product || x.size !== action.payload.size);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    toggleCartDrawer: (state, action) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    }
  },
});

export const { addToCart, removeFromCart, toggleCartDrawer } = cartSlice.actions;

export default cartSlice.reducer;
