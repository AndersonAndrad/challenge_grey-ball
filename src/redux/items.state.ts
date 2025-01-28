'use client'

import { Item } from "@/interfaces/Item.interface";
import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    cacheItems: [],
    sortBy: null, // 'price' or 'rating'
    sortOrder: 0, // 0 = no sort, 1 = descending, 2 = ascending
  },
  reducers: {
    addItem: (state, action) => {
      if (state.items.some((item: Item) => item.id === action.payload?.id)) return;
      state.items.push(action.payload);
      state.cacheItems.push(action.payload); // Keep the original order
    },

    sortItems: (state, action) => {
      const { type } = action.payload; // 'price' or 'rating'

      if (state.sortBy === type) {
        state.sortOrder = (state.sortOrder + 1) % 3;
      } else {
        state.sortBy = type;
        state.sortOrder = 1;
      }

      if (state.sortOrder === 0) {
        state.items = [...state.cacheItems]; // Reset to original order
      } else {
        state.items.sort((a, b) => {
          const valueA = a[type];
          const valueB = b[type];

          return state.sortOrder === 1 ? valueB - valueA : valueA - valueB;
        });
      }
    },
  },
});

export const { addItem, sortItems } = itemSlice.actions;
export default itemSlice.reducer;
