import React from "react";

import styles from "./CartItem.module.css";
import { ProductWithCountType } from "../../types/types";
import Button from "../../UI/Button/Button";

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
        <Button title="-" onClick={onMinusClick} />
        <span>{item.count}</span>
        <Button title="+" onClick={onPlusClick} />
      </div>
      <Button title="X" onClick={onDeleteClick} width="fit-content" />
    </li>
  );
};
