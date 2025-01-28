import cartReducer from './cart.state';
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items.state';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    items: itemsReducer
  },
});

export default store;