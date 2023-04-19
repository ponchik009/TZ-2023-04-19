import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductType, ProductWithCountType, SortType } from "../../types/types";
import { CatalogApi } from "../../api/CatalogApi";
import { RootState } from "../store";

export interface CartState {
  cartItems: ProductWithCountType[];
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<ProductType>) {
      if (state.cartItems.some((i) => i.product.id === action.payload.id)) {
        state.cartItems.find((i) => i.product.id === action.payload.id)!
          .count++;
      } else {
        state.cartItems.push({ product: action.payload, count: 1 });
      }

      state.totalPrice = state.totalPrice + action.payload.regular_price.value;
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product.id === action.payload
      );

      state.totalPrice = state.cartItems.reduce(
        (acc, curr) => acc + curr.count * curr.product.regular_price.value,
        0
      );
    },
    changeItemCount(
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) {
      state.cartItems.find((i) => i.product.id === action.payload.id)!.count =
        action.payload.count;

      state.totalPrice = state.cartItems.reduce(
        (acc, curr) => acc + curr.count * curr.product.regular_price.value,
        0
      );
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, changeItemCount } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
