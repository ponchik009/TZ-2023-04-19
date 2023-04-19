import { createBrowserRouter } from "react-router-dom";

import { Catalog } from "../../pages/Catalog/Catalog";
import { Cart } from "../../pages/Cart/Cart";
import { MainLayout } from "../MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Catalog />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <div>СТРАНИЦА НЕ НАЙДЕНА!</div>,
      },
    ],
  },
]);
