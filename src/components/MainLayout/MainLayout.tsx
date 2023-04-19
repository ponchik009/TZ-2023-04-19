import React from "react";

import styles from "./MainLayout.module.css";

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return <div className={styles.Layout}>{children}</div>;
};
