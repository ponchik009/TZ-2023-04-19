import classNames from "classnames";
import React from "react";

import styles from "./Input.module.css";

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  isError?: boolean;
}

const Input: React.FC<IInputProps> = React.memo(
  ({
    value,
    onChange,
    placeholder,
    disabled = false,
    type = "text",
    isError = false,
  }) => {
    return (
      <input
        type={type}
        className={classNames(styles.input, {
          [styles.error]: isError,
        })}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="new-password"
      />
    );
  }
);

export default Input;
