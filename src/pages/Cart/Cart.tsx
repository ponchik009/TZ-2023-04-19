import React from "react";

import styles from "./Cart.module.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  resetCart,
  selectCartItems,
  selectTotalPrice,
  submitOrder,
} from "../../store/CartSlice/CartSlice";
import { CartList } from "../../components/CartList/CartList";
import { Link, useNavigate } from "react-router-dom";
import { CartForm } from "../../components/CartForm/CartForm";
import { CartModal } from "../../components/CartModal/CartModal";
import Button from "../../UI/Button/Button";

export const Cart = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
  });

  const [modalOpen, setModalOpen] = React.useState(false);

  const onModalClose = () => {
    setModalOpen(false);
    dispatch(resetCart());
    navigate("/");
  };

  return (
    <main className={styles.Cart}>
      {cartItems.length > 0 ? (
        <>
          <Link to={"/"}>
            <Button title="В каталог" onClick={() => {}} />
          </Link>
          <CartList items={cartItems} />
          <span>Общая стоимость: {currencyFormatter.format(totalPrice)}</span>
          <CartForm
            onSubmit={({ name, phone }) => {
              dispatch(submitOrder({ items: cartItems, name, phone }));
              setModalOpen(true);
            }}
          />
          <CartModal open={modalOpen} onClose={onModalClose} />
        </>
      ) : (
        <>
          <span>В корзине нет товаров! Вернитесь на страницу каталога</span>
          <Link to={"/"}>
            <Button title="В каталог" onClick={() => {}} />
          </Link>
        </>
      )}
    </main>
  );
};
