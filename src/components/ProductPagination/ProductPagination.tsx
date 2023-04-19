import React from "react";

import styles from "./ProductPagination.module.css";

import { useAppDispatch } from "../../store/hooks";
import { updatePage } from "../../store/ProductsSlice/ProductsSlice";

interface IProductPaginationProps {
  page?: number;
  maxPage: number;
}

export const ProductPagination: React.FC<IProductPaginationProps> = ({
  page = 0,
  maxPage,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.Container}>
      <button
        disabled={page === 0}
        onClick={() => dispatch(updatePage(page - 1))}
      >{`<`}</button>
      {page + 1}
      <button
        disabled={page + 1 === maxPage}
        onClick={() => dispatch(updatePage(page + 1))}
      >{`>`}</button>
    </div>
  );
};
