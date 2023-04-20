import React from "react";

import styles from "./ProductPagination.module.css";

import { useAppDispatch } from "../../store/hooks";
import { updatePage } from "../../store/ProductsSlice/ProductsSlice";
import Button from "../../UI/Button/Button";

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
      <Button
        title="<"
        onClick={() => dispatch(updatePage(page - 1))}
        disabled={page === 0}
      />
      {page + 1}
      <Button
        title=">"
        onClick={() => dispatch(updatePage(page + 1))}
        disabled={page + 1 === maxPage}
      />
    </div>
  );
};
