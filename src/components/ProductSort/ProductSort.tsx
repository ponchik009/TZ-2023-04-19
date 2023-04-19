import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { updateSort } from "../../store/ProductsSlice/ProductsSlice";
import { SortDirectionEnum, SortEnum } from "../../types/enums";

export const ProductSort = () => {
  const dispatch = useAppDispatch();
  return (
    <select
      name="sort"
      id="sort"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch(updateSort(JSON.parse(e.target.selectedOptions[0].value)))
      }
      defaultValue={JSON.stringify({
        type: SortEnum.BY_TITLE,
        direction: SortDirectionEnum.ASC,
      })}
    >
      <option
        value={JSON.stringify({
          type: SortEnum.BY_PRICE,
          direction: SortDirectionEnum.ASC,
        })}
      >
        Сначала недорогие
      </option>
      <option
        value={JSON.stringify({
          type: SortEnum.BY_PRICE,
          direction: SortDirectionEnum.DESC,
        })}
      >
        Сначала подороже
      </option>
      <option
        value={JSON.stringify({
          type: SortEnum.BY_TITLE,
          direction: SortDirectionEnum.ASC,
        })}
      >
        По названию (возр.)
      </option>
      <option
        value={JSON.stringify({
          type: SortEnum.BY_TITLE,
          direction: SortDirectionEnum.DESC,
        })}
      >
        По названию (убыв.)
      </option>
      <option
        value={JSON.stringify({
          type: SortEnum.BY_BRAND,
          direction: SortDirectionEnum.ASC,
        })}
      >
        По бренду (возр.)
      </option>
      <option
        value={JSON.stringify({
          type: SortEnum.BY_BRAND,
          direction: SortDirectionEnum.DESC,
        })}
      >
        По бренду (убыв.)
      </option>
    </select>
  );
};
