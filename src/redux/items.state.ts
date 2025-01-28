'use client'

import { Item } from "@/interfaces/Item.interface";
import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      if (state.items.some((item: Item) => item.id === action.payload?.id)) return;

      state.items.push(action.payload);
    },
  }
})

export const { addItem } = itemSlice.actions;

export default itemSlice.reducer;