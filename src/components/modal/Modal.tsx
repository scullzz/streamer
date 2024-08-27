import { createPortal } from "react-dom";
import styles from "./style.module.css";
import { useEffect, useRef } from "react";

export type DefaultModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClose?: () => void;
  onSubmit?: () => void;
};

export const Modal = ({ children, style, onClose }: DefaultModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && e.target === ref.current && onClose) {
      onClose();
    }
  };

  const rootElement = document.querySelector("#root");
  if (!rootElement) {
    return null; 
  }

  return createPortal(
    <div className={styles.modal} style={style} ref={ref} onClick={onClick}>
      <div className={styles.modal_form}>{children}</div>
    </div>,
    rootElement
  );
};
