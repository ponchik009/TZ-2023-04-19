import React from "react";

import styles from "./ProductCart.module.css";
import { ReactComponent as IconCart } from "../../data/icons/IconCart.svg";

import { Link } from "react-router-dom";
import { ProductWithCountType } from "../../types/types";

interface IProductCartProps {
  cartItems: ProductWithCountType[];
}

export const ProductCart: React.FC<IProductCartProps> = ({ cartItems }) => {
  return (
    <Link to="/cart" className={styles.Container}>
      <IconCart className={styles.Icon} />
      <span className={styles.Count}>{cartItems.length}</span>
    </Link>
  );
};
