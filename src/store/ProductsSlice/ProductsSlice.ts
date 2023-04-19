import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingType, ProductType, SortType } from "../../types/types";
import { SortDirectionEnum, SortEnum } from "../../types/enums";
import { CatalogApi } from "../../api/CatalogApi";
import { RootState } from "../store";

export interface ProductsState {
  search: string;
  filters: number[];
  sort: SortType;

  items: ProductType[];

  status: LoadingType;
}

const initialState: ProductsState = {
  search: "",
  filters: [],
  sort: { type: SortEnum.BY_TITLE, direction: SortDirectionEnum.ASC },
  items: [],
  status: "success",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (data: {
    seatch: string;
    filters: number[];
    sort: SortType;
    page: number;
  }) => {
    return CatalogApi.getProducts(
      data.page,
      data.seatch,
      data.filters,
      data.sort
    );
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    updateFilters(state, action: PayloadAction<number[]>) {
      state.filters = action.payload;
    },
    updateSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      });
  },
});

export const { updateFilters, updateSearch, updateSort } =
  productsSlice.actions;

export const selectItems = (state: RootState) => state.products.items;
export const selectSearch = (state: RootState) => state.products.search;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectSort = (state: RootState) => state.products.sort;

export default productsSlice.reducer;
