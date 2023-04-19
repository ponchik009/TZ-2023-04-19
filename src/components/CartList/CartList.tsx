import React from "react";

import styles from "./CartList.module.css";

import { ProductWithCountType } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { CartItem } from "../CartItem/CartItem";
import { changeItemCount } from "../../store/CartSlice/CartSlice";
import { removeItemFromCart } from "../../store/CartSlice/CartSlice";

interface ICartListProps {
  items: ProductWithCountType[];
}

export const CartList: React.FC<ICartListProps> = ({ items }) => {
  const dispatch = useAppDispatch();

  return (
    <ul className={styles.List}>
      {items.map((item) => (
        <CartItem
          item={item}
          key={item.product.id}
          onMinusClick={() =>
            dispatch(
              changeItemCount({
                id: item.product.id,
                count: item.count - 1,
              })
            )
          }
          onPlusClick={() =>
            dispatch(
              changeItemCount({
                id: item.product.id,
                count: item.count + 1,
              })
            )
          }
          onDeleteClick={() => {
            console.log(item);
            dispatch(removeItemFromCart(item.product.id));
          }}
        />
      ))}
    </ul>
  );
};
