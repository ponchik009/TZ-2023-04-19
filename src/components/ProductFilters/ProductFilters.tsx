import React from "react";

import styles from "./ProductFilters.module.css";

import { BrandType } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { updateFilters } from "../../store/ProductsSlice/ProductsSlice";
import Button from "../../UI/Button/Button";

interface IProductFiltersProps {
  brands: BrandType[];
  currentFilters: number[];
}

export const ProductFilters: React.FC<IProductFiltersProps> = ({
  brands,
  currentFilters,
}) => {
  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = React.useState(true);

  return (
    <aside className={styles.Container}>
      <div className={styles.TitleSection}>
        <span className={styles.Title}>Бренды</span>
        <Button
          title={isOpened ? "\u1431" : "\u142F"}
          onClick={() => setIsOpened((prev) => !prev)}
          width="fit-content"
        />
      </div>
      {isOpened && (
        <>
          <div className={styles.Filters}>
            {brands.map((brand) => (
              <label
                htmlFor={brand.title}
                className={styles.Label}
                key={brand.id}
              >
                <input
                  type="checkbox"
                  id={brand.title}
                  checked={currentFilters.includes(brand.id)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      updateFilters(
                        e.target.checked
                          ? [...currentFilters, brand.id]
                          : currentFilters.filter((id) => id !== brand.id)
                      )
                    )
                  }
                />
                {brand.title}
              </label>
            ))}
          </div>
          <Button
            title="Очистить"
            onClick={() => dispatch(updateFilters([]))}
            width="fit-content"
          />
        </>
      )}
    </aside>
  );
};
