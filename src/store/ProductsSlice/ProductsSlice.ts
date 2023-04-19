import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  BrandType,
  LoadingType,
  ProductType,
  SortType,
} from "../../types/types";
import { SortDirectionEnum, SortEnum } from "../../types/enums";
import { CatalogApi } from "../../api/CatalogApi";
import { RootState } from "../store";

export interface ProductsState {
  search: string;
  filters: number[];
  sort: SortType;
  page: number;

  items: ProductType[];
  brands: BrandType[];
  maxPage: number;

  status: LoadingType;
}

const initialState: ProductsState = {
  search: "",
  filters: [],
  sort: { type: SortEnum.BY_TITLE, direction: SortDirectionEnum.ASC },
  page: 0,

  items: [],
  brands: [],
  maxPage: 1,

  status: "success",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (data: {
    search: string;
    filters: number[];
    sort: SortType;
    page: number;
  }) => {
    return CatalogApi.getProducts(
      data.page,
      data.search,
      data.filters,
      data.sort
    );
  }
);

export const fetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    return CatalogApi.getBrands();
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
    updatePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.products;
        state.maxPage = action.payload.maxPage;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "success";
        state.brands = action.payload;
      });
  },
});

export const { updateFilters, updateSearch, updateSort, updatePage } =
  productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectItems = (state: RootState) => state.products.items;
export const selectSearch = (state: RootState) => state.products.search;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectSort = (state: RootState) => state.products.sort;

export default productsSlice.reducer;
