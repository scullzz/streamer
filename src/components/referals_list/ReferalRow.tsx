import styles from "./style.module.css";

const ReferalRow = ({ name, date, image }: any) => {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}>
        <img src={"https://api.bigstreamerbot.io/" + image} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>Подписан с {date}</div>
      </div>
    </div>
  );
};

export default ReferalRow;
