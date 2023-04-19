import { createBrowserRouter } from "react-router-dom";

import { Catalog } from "../../pages/Catalog/Catalog";
import { Product } from "../../pages/Product/Product";
import { Cart } from "../../pages/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Catalog />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/catalog/:itemId",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <div>СТРАНИЦА НЕ НАЙДЕНА!</div>,
  },
]);
