import styles from "./style.module.css";
import ReferalRow from "./ReferalRow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tg } from "../../App";
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
  tgid: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  username: string;
}

interface MainInterface {
  id: number;
  title: string;
  user: User;
  date_created: string;
}

const ReferalList = () => {
  const { id } = useParams();
  const [listSubs, setListSubs] = useState<MainInterface[] | []>([]);
  
  useEffect(() => {
    tg.setHeaderColor("#efeff3");
    tg.setBackgroundColor("#efeff3");
  }, []);
  const getAllReferrals = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/referrals/?pk=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Auth: tg.initData,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setListSubs(res.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllReferrals();
  }, []);

  return (
    <div className={styles.subscribers_list}>
      <div className={styles.container}>
        <h2 className={styles.title}>Рефералы Casino_Malaya</h2>
        <p className={styles.description}>
          Список пользователей, которых привел в бота аффилейт по своей ссылке.
          Таким пользователям показываются реферальные ссылки на казино онлайн
          только от этого аффилейта.
        </p>
        <div className={styles.listContainer}>
          <div className={styles.blockOverflow}>
            {Array.isArray(listSubs) && listSubs.length > 0
              ? listSubs.map((subscriber, index) => (
                  <ReferalRow
                    key={index}
                    name={
                      subscriber.user.first_name +
                      (subscriber.user.last_name || "")
                    }
                    date={formatDateToRussian(subscriber.date_created)}
                    image={subscriber.user.image}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferalList;
