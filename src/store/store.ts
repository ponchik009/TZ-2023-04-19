import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsSlice from "./ProductsSlice/ProductsSlice";
import cartSlice from "./CartSlice/CartSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
