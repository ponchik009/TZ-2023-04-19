import React from "react";

import styles from "./ProductFilters.module.css";

import { BrandType } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { updateFilters } from "../../store/ProductsSlice/ProductsSlice";

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
        <button onClick={() => setIsOpened((prev) => !prev)}>
          {isOpened ? "\u1431" : "\u142F"}
        </button>
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
          <button onClick={() => dispatch(updateFilters([]))}>Очистить</button>
        </>
      )}
    </aside>
  );
};
