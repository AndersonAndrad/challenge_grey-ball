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
    filterText: '', // Stores the search term
  },
  reducers: {
    addItem: (state, action) => {
      if (state.items.some((item: Item) => item.id === action.payload?.id)) return;
      state.items.push(action.payload);
      state.cacheItems.push(action.payload);
    },

    sortItems: (state, action) => {
      const { type } = action.payload; // 'price' or 'rating'

      if (state.sortBy === type) {
        state.sortOrder = (state.sortOrder + 1) % 3;
      } else {
        state.sortBy = type;
        state.sortOrder = 1;
      }

      itemSlice.caseReducers.applyFiltersAndSorting(state);
    },

    filterItems: (state, action) => {
      state.filterText = action.payload.trim().replace(/\s+/g, '').toLowerCase();
      itemSlice.caseReducers.applyFiltersAndSorting(state);
    },

    applyFiltersAndSorting: (state) => {
      let filteredItems = state.cacheItems;

      // Apply case-insensitive filter
      if (state.filterText) {
        filteredItems = filteredItems.filter((item: Item) =>
          item.title.toLowerCase().includes(state.filterText)
        );
      }

      // Apply sorting if enabled
      if (state.sortOrder !== 0) {
        filteredItems = [...filteredItems].sort((a, b) => {
          const valueA = a[state.sortBy];
          const valueB = b[state.sortBy];
          return state.sortOrder === 1 ? valueB - valueA : valueA - valueB;
        });
      }

      state.items = filteredItems;
    },
  },
});

export const { addItem, sortItems, filterItems } = itemSlice.actions;
export default itemSlice.reducer;
