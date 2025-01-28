'use client'

import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeDuplicates: () => {
      // state.items = state.
    }
  }
})

export const { addItem } = itemSlice.actions;

export default itemSlice.reducer;