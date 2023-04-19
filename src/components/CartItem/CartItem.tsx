import React from "react";

import styles from "./CartItem.module.css";
import { ProductWithCountType } from "../../types/types";

interface ICartItemProps {
  item: ProductWithCountType;
  onPlusClick: () => void;
  onMinusClick: () => void;
  onDeleteClick: () => void;
}

export const CartItem: React.FC<ICartItemProps> = ({
  item,
  onPlusClick,
  onMinusClick,
  onDeleteClick,
}) => {
  const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: item.product.regular_price.currency,
  });

  return (
    <li className={styles.Item}>
      <span className={styles.Title}>{item.product.title}</span>
      <span className={styles.Price}>
        {currencyFormatter.format(
          item.count * item.product.regular_price.value
        )}
      </span>
      <div className={styles.Count}>
        <button onClick={onMinusClick}>-</button>
        <span>{item.count}</span>
        <button onClick={onPlusClick}>+</button>
      </div>
      <button onClick={onDeleteClick}>X</button>
    </li>
  );
};
