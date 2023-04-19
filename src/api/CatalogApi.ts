import brands from "../assets/brands.json";
import products from "../assets/products.json";
import { PAGE_SIZE } from "../const/const";

import { SortDirectionEnum, SortEnum } from "../types/enums";
import { SortType } from "../types/types";

export class CatalogApi {
  static async getBrands() {
    return Promise.resolve(brands);
  }

  static async getProducts(
    page: number = 0,
    search: string = "",
    filters: number[] = brands.map((b) => b.id),
    sort: SortType = {
      type: SortEnum.BY_TITLE,
      direction: SortDirectionEnum.ASC,
    }
  ) {
    const filteredBySearch = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    const filteredByFilters =
      filters.length > 0
        ? filteredBySearch.filter((p) => filters.includes(p.brand))
        : filteredBySearch;

    // сортировки...
    let sorted = null;
    if (sort.type === SortEnum.BY_TITLE) {
      if (sort.direction === SortDirectionEnum.ASC) {
        sorted = filteredByFilters.sort((p1, p2) =>
          p1.title.localeCompare(p2.title)
        );
      } else {
        sorted = filteredByFilters.sort(
          (p1, p2) => -p1.title.localeCompare(p2.title)
        );
      }
    } else if (sort.type === SortEnum.BY_BRAND) {
      if (sort.direction === SortDirectionEnum.ASC) {
        sorted = filteredByFilters.sort((p1, p2) => p1.brand - p2.brand);
      } else {
        sorted = filteredByFilters.sort((p1, p2) => p2.brand - p1.brand);
      }
    } else {
      if (sort.direction === SortDirectionEnum.ASC) {
        sorted = filteredByFilters.sort(
          (p1, p2) => p1.regular_price.value - p2.regular_price.value
        );
      } else {
        sorted = filteredByFilters.sort(
          (p1, p2) => p2.regular_price.value - p1.regular_price.value
        );
      }
    }

    return Promise.resolve(sorted.slice(page * PAGE_SIZE, PAGE_SIZE));
  }
}
