import styles from "./style.module.css";

const SureModal = ({ isOpen, onClose, name, approve }: any) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const UnSubscribe = () => {
    approve();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <p className={styles.title}>Отписаться от {name}?</p>
        <div className={styles.modalButtons}>
          <button
            onClick={() => UnSubscribe()}
            className={styles.unsubscribeButton}
          >
            Отписаться
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default SureModal;
