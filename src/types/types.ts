import { SortDirectionEnum, SortEnum } from "./enums";

export type BrandType = {
  id: number;
  title: string;
  sort: string;
  code: string;
};

export type PriceType = {
  currency: string;
  value: number;
};

export type ProductType = {
  type: string;
  id: number;
  sku: string;
  title: string;
  image: string;
  brand: number;
  regular_price: PriceType;
};

export type ProductWithCountType = {
  product: ProductType;
  count: number;
};

export type SortType = {
  type: SortEnum;
  direction: SortDirectionEnum;
};

export type LoadingType = "loading" | "success" | "error";
