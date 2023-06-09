import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductType, ProductWithCountType, SortType } from "../../types/types";
import { CatalogApi } from "../../api/CatalogApi";
import { RootState } from "../store";
import { CartApi } from "../../api/CartApi";

export interface CartState {
  cartItems: ProductWithCountType[];
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

export const submitOrder = createAsyncThunk(
  "cart/submitOrder",
  async (data: {
    items: ProductWithCountType[];
    name: string;
    phone: string;
  }) => {
    return CartApi.sendInfo(data);
  }
);

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
        (i) => i.product.id !== action.payload
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
      const item = state.cartItems.find(
        (i) => i.product.id === action.payload.id
      );

      if (!item) {
        return;
      }

      item!.count = action.payload.count;

      if (item.count === 0) {
        state.cartItems = state.cartItems.filter(
          (i) => i.product.id !== item!.product.id
        );
      }

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
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {})
      .addCase(submitOrder.fulfilled, (state) => {});
  },
});

export const { addItemToCart, removeItemFromCart, changeItemCount, resetCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
