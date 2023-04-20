import classNames from "classnames";
import React from "react";

import styles from "./Button.module.css";

export type ButtonWidth = "max" | "fit-content";

interface IButtonProps {
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  title: string;
  width?: ButtonWidth;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  title,
  type = "button",
  onClick,
  width = "inherit",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, {
        [styles.widthMax]: width === "max",
        [styles.widthFit]: width === "fit-content",
      })}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
