import React from "react";

import styles from "./CartForm.module.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

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
      <Input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button title="Оформить заказ" type="submit" onClick={() => {}} />
    </form>
  );
};
