import React from "react";

import styles from "./MainLayout.module.css";
import { Outlet, useLocation } from "react-router-dom";

interface IMainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = React.useState("");

  function getPageTitle() {
    if (location.pathname === "/" || location.pathname === "/catalog") {
      setPageTitle("Каталог");
    } else if (location.pathname === "/cart") {
      setPageTitle("Корзина");
    } else {
      setPageTitle("404 not found");
    }
  }

  React.useEffect(() => {
    getPageTitle();
  }, [location.pathname]);

  return (
    <div className={styles.Layout}>
      <h1>{pageTitle}</h1>
      {children || <Outlet />}
    </div>
  );
};
