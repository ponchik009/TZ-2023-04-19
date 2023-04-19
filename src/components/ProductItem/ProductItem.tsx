import React from "react";

import { ProductType } from "../../types/types";

import styles from "./ProductItem.module.css";

interface IProductItemProps {
  item: ProductType;
  countInCart?: number;
  onButtonClick: () => void;
}

export const ProductItem: React.FC<IProductItemProps> = ({
  item,
  countInCart = 0,
  onButtonClick,
}) => {
  const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: item.regular_price.currency,
  });

  return (
    <li className={styles.Item}>
      <img src={item.image} alt={item.title} className={styles.Image} />
      <div className={styles.Content}>
        <span>{item.title}</span>
        <span>{item.brand.title}</span>
        <span>{currencyFormatter.format(item.regular_price.value)}</span>
        <div className={styles.CartSection}>
          <button onClick={onButtonClick}>В корзину</button>
          {countInCart > 0 && <span>В корзине: {countInCart}</span>}
        </div>
      </div>
    </li>
  );
};
