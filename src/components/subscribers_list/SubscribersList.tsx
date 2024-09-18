import React from "react";
import styles from "./style.module.css";
import SubscriberRow from "./SubscribeRow";
import { SectionHeader } from "../section_header/SectionHeader";

const subscribers = [
  { name: "Tim Zavrik", date: "2 сентября 2024" },
  { name: "RUBEN_GEVORGYAN", date: "2 сентября 2024" },
  { name: "FORS_INC", date: "1 сентября 2024" },
  { name: "Miroshni4ek", date: "1 сентября 2024" },
  { name: "Vetali", date: "31 августа 2024" },
  { name: "SAgitov", date: "31 августа 2024" },
  { name: "Valeriya", date: "30 августа 2024" },
];

interface User {
  id: number; 
  tgid: number;
  first_name?: string | null; 
  last_name?: string | null; 
  email?: string | null;
  image?: string | null;
  username?: string | null;
}

const SubscribersList = () => {
  return (
    <div className={styles.subscribers_list}>
      <SectionHeader
        left={<span>Назад</span>}
        center={<span>Clash of Slots</span>}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>Подписчики Casino_Malaya</h2>
        <p className={styles.description}>
          Список пользователей, которые включили уведомления для оповещений о
          стримах и розыгрышах.
        </p>
        <div className={styles.listContainer}>
          <button className={styles.downloadButton}>Скачать</button>
          <div className={styles.blockOverflow}>
            {subscribers.map((subscriber, index) => (
              <SubscriberRow
                key={index}
                name={subscriber.name}
                date={subscriber.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersList;
