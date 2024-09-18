import styles from "./style.module.css";

const SubscriberRow = ({ name, date }: any) => {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s" alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>Подписан с {date}</div>
      </div>
    </div>
  );
};

export default SubscriberRow;
