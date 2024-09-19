import styles from "./style.module.css";
import SubscriberRow from "./SubscribeRow";
import { SectionHeader } from "../section_header/SectionHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function formatDateToRussian(isoDateStr: string) {
  // Array of Russian month names
  const russianMonths = [
    "января", // January
    "февраля", // February
    "марта", // March
    "апреля", // April
    "мая", // May
    "июня", // June
    "июля", // July
    "августа", // August
    "сентября", // September
    "октября", // October
    "ноября", // November
    "декабря", // December
  ];

  // Truncate milliseconds to 3 digits if necessary
  const truncatedIsoDateStr = isoDateStr.replace(
    /\.\d{3}\d*Z$/,
    (match) => match.slice(0, 4) + "Z"
  );

  // Create Date object
  const dateObj = new Date(truncatedIsoDateStr);

  // Extract day, month, and year
  const day = dateObj.getUTCDate();
  const monthIndex = dateObj.getUTCMonth(); // Months are zero-indexed (0-11)
  const month = russianMonths[monthIndex];
  const year = dateObj.getUTCFullYear();

  // Format the date in Russian
  const formattedDate = `${day} ${month} ${year}`;

  // Return the formatted date
  return formattedDate;
}

interface User {
  id: number;
  tgid: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
}

interface Subscription {
  date_subscription: Date;
  date_unsubscribe: Date;
  id: number;
  is_sub: boolean;
  notification_kick: boolean;
  notification_raffle: boolean;
  notification_twitch: boolean;
  notification_youtube: boolean;
  streamer: number;
  user: number;
}

const SubscribersList = () => {
  const { id } = useParams();
  const [listSubs, setListSubs] = useState<User[] | []>([]);
  const [listExtraInfoSubs, setExtraInfoSubs] = useState<Subscription[] | []>(
    []
  );
  const getAllSubscribers = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/users-subscriptions/streamers/?pk=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Auth: "M1bCSx92W6",
          },
        }
      );

      const res = await response.json();
      setListSubs(res.users);
      setExtraInfoSubs(res.subscriptions);
    } catch (err) {
      console.log(err);
    }
  };

  const getExcel = async () => {
    try {
      await fetch(`https://bot.bigstreamerbot.io/send-subscriptions?pk=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": "tAhpSg4SJP",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSubscribers();
  }, []);

  return (
    <div className={styles.subscribers_list}>
      <SectionHeader
        left={<span onClick={()=> {window.history.back()}}>Назад</span>}
        center={<span>Clash of Slots</span>}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>Подписчики Casino_Malaya</h2>
        <p className={styles.description}>
          Список пользователей, которые включили уведомления для оповещений о
          стримах и розыгрышах.
        </p>
        <div className={styles.listContainer}>
          <button
            onClick={() => {
              getExcel();
            }}
            className={styles.downloadButton}
          >
            Скачать
          </button>
          <div className={styles.blockOverflow}>
            {listSubs.map((subscriber, index) => (
              <SubscriberRow
                key={index}
                name={subscriber.first_name + (subscriber.last_name || "")}
                date={formatDateToRussian(
                  listExtraInfoSubs
                    .filter((item) => item.user === subscriber.id)[0]
                    .date_subscription.toString()
                )}
                image={subscriber.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersList;
