import React from "react";

import styles from "./CartModal.module.css";

import Modal from "../../UI/Modal/Modal";

interface ICartModalProps {
  open: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<ICartModalProps> = ({ open, onClose }) => {
  return (
    <Modal title="Оформление заказа" open={open} onClose={onClose}>
      <span>Заказ успешно офорслен! Вы можете вернуться в каталог</span>
      <button onClick={onClose}>Закрыть</button>
    </Modal>
  );
};
