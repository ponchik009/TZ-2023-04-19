import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductType, ProductWithCountType, SortType } from "../../types/types";
import { CatalogApi } from "../../api/CatalogApi";
import { RootState } from "../store";

export interface CartState {
  items: ProductWithCountType[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<ProductType>) {
      state.items.push({ product: action.payload, count: 1 });

      state.totalPrice = state.totalPrice + action.payload.regular_price.value;
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id === action.payload);

      state.totalPrice = state.items.reduce(
        (acc, curr) => acc + curr.count * curr.product.regular_price.value,
        0
      );
    },
    changeItemCount(
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) {
      state.items.find((i) => i.product.id === action.payload.id)!.count =
        action.payload.count;

      state.totalPrice = state.items.reduce(
        (acc, curr) => acc + curr.count * curr.product.regular_price.value,
        0
      );
    },
    resetCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, changeItemCount } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
