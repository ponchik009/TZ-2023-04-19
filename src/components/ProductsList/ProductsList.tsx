import React from "react";

import { ProductType, ProductWithCountType } from "../../types/types";

import styles from "./ProductsList.module.css";
import { ProductItem } from "../ProductItem/ProductItem";

interface IProductsListProps {
  items: ProductType[];
  cartItems: ProductWithCountType[];
  onButtonClick: (product: ProductType) => void;
}

export const ProductsList: React.FC<IProductsListProps> = ({
  items,
  cartItems,
  onButtonClick,
}) => {
  return (
    <ul className={styles.List}>
      {items.map((item) => {
        const countInCart =
          cartItems.find((i) => i.product.id === item.id)?.count || 0;
        return (
          <ProductItem
            item={item}
            countInCart={countInCart}
            key={item.id}
            onButtonClick={() => onButtonClick(item)}
          />
        );
      })}
    </ul>
  );
};
