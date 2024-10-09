import styles from "./style.module.css";

const AdminsRow = ({ name, image }: any) => {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}>
        <img src={"https://api.bigstreamerbot.io/" + image} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};

export default AdminsRow;
