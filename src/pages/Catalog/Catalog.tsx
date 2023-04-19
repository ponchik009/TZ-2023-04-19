import React from "react";

import styles from "./Catalog.module.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchBrands,
  fetchProducts,
  selectProducts,
  updateSearch,
} from "../../store/ProductsSlice/ProductsSlice";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { ProductType } from "../../types/types";
import {
  addItemToCart,
  selectCartItems,
} from "../../store/CartSlice/CartSlice";
import { ProductSort } from "../../components/ProductSort/ProductSort";
import { ProductCart } from "../../components/ProductCart/ProductCart";
import { ProductFilters } from "../../components/ProductFilters/ProductFilters";
import { ProductPagination } from "../../components/ProductPagination/ProductPagination";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const { filters, items, brands, search, sort, page, maxPage } =
    useAppSelector(selectProducts);
  const cartItems = useAppSelector(selectCartItems);

  React.useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  React.useEffect(() => {
    dispatch(
      fetchProducts({
        search,
        filters,
        sort,
        page,
      })
    );
  }, [filters, search, sort, page]);

  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(updateSearch(e.target.value)),
    [dispatch, updateSearch]
  );

  return (
    <main className={styles.Catalog}>
      <section className={styles.Top}>
        <div className={styles.TopSearch}>
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={handleSearchChange}
          />
          <ProductSort />
        </div>
        <ProductCart cartItems={cartItems} />
      </section>
      <section className={styles.Center}>
        <ProductFilters brands={brands} currentFilters={filters} />
        <ProductsList
          items={items}
          cartItems={cartItems}
          onButtonClick={(product: ProductType) =>
            dispatch(addItemToCart(product))
          }
        />
      </section>
      <section className={styles.Bottom}>
        <ProductPagination page={page} maxPage={maxPage} />
      </section>
    </main>
  );
};
