import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<IModalProps> = ({ children, open, onClose, title }) => {
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className={styles.modal} onClick={onClose}>
          <div
            onClick={(event) => event.stopPropagation()}
            className={styles.modalContent}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>{title}</h2>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;
