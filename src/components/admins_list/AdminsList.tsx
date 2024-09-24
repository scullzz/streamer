import styles from "./style.module.css";
import AdminsRow from "./AdminsRow";
import { SectionHeader } from "../section_header/SectionHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import add from "./image/add.svg";

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

const AdminsList = () => {
  const { id } = useParams();
  const [listSubs, setListSubs] = useState<MainInterface[] | []>([]);
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
    } catch (err) {
      console.log(err);
    }
  };

  // const addAdminAction = async () => {
  //   try {
  //     await fetch(`https://api.bigstreamerbot.io/streamer-admins/?pk=${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Auth: "M1bCSx92W6",
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getAllSubscribers();
  }, []);

  return (
    <div className={styles.subscribers_list}>
      <SectionHeader
        left={
          <span
            onClick={() => {
              window.history.back();
            }}
          >
            Назад
          </span>
        }
        center={<span>Clash of Slots</span>}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>Администраторы</h2>
        <div className={styles.listContainer}>
          <button
            // onClick={() => {
            //   addAdminAction();
            // }}
            className={styles.addAdminButton}
          >
            <img className={styles.addIcon} src={add} alt="#" />
            <div className={styles.addAdminText}>Добавить администратора</div>
          </button>
          <div className={styles.blockOverflow}>
            {listSubs.map((subscriber, index) => (
              <AdminsRow
                key={index}
                name={
                  subscriber.user.first_name + (subscriber.user.last_name || "")
                }
                date={formatDateToRussian(subscriber.date_created)}
                image={subscriber.user.image}
              />
            ))}
          </div>
        </div>
        <p className={styles.description}>
          Вы можете добавлять администраторов, чтобы они помогали Вам управлять
          страницей аффилейта.
        </p>
      </div>
    </div>
  );
};

export default AdminsList;
