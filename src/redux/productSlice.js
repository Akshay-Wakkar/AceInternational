import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToList: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    globalList: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToList, globalList } = productSlice.actions;

export const selectItems = (state) => state.products.items;

export default productSlice.reducer;
