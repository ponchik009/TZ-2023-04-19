import React from "react";

import styles from "./CartForm.module.css";

interface ICartFormProps {
  onSubmit: (data: { name: string; phone: string }) => void;
}

export const CartForm: React.FC<ICartFormProps> = ({ onSubmit }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, phone });
  };
  return (
    <form className={styles.Form} onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Телефон"
        inputMode="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Оформить заказ</button>
    </form>
  );
};
