import styles from "./style.module.css";
import AdminsRow from "./AdminsRow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import add from "./image/add.svg";
import { tg } from "../../App";
// function formatDateToRussian(isoDateStr: string) {
//   // Array of Russian month names
//   const russianMonths = [
//     "января", // January
//     "февраля", // February
//     "марта", // March
//     "апреля", // April
//     "мая", // May
//     "июня", // June
//     "июля", // July
//     "августа", // August
//     "сентября", // September
//     "октября", // October
//     "ноября", // November
//     "декабря", // December
//   ];

//   // Truncate milliseconds to 3 digits if necessary
//   const truncatedIsoDateStr = isoDateStr.replace(
//     /\.\d{3}\d*Z$/,
//     (match) => match.slice(0, 4) + "Z"
//   );

//   // Create Date object
//   const dateObj = new Date(truncatedIsoDateStr);

//   // Extract day, month, and year
//   const day = dateObj.getUTCDate();
//   const monthIndex = dateObj.getUTCMonth(); // Months are zero-indexed (0-11)
//   const month = russianMonths[monthIndex];
//   const year = dateObj.getUTCFullYear();

//   // Format the date in Russian
//   const formattedDate = `${day} ${month} ${year}`;

//   // Return the formatted date
//   return formattedDate;
// }

interface StreamerInfo {
  id: number;
  name: string;
  count_sub: number;
  image: string;
  is_subscribed: boolean;
}

interface UserInfo {
  id: number;
  tgid: number;
  first_name: string;
  last_name: string | null;
  email: string | null;
  image: string;
  username: string;
}

interface StreamData {
  id: number;
  streamer: number;
  streamer_info: StreamerInfo;
  user: number;
  user_info: UserInfo;
  role: string;
  add_url: string;
  add_date: string;
}

const AdminsList = () => {
  const { id } = useParams();
  const [listSubs, setListSubs] = useState<StreamData[] | []>([]);
  useEffect(() => {
    tg.setHeaderColor("#efeff3");
    tg.setBackgroundColor("#efeff3");
  }, []);
  const getAllSubscribers = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/streamer-admins/?pk=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Auth: tg.initData,
          },
        }
      );

      const res = await response.json();
      setListSubs(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSubscribers();
  }, []);

  return (
    <div className={styles.subscribers_list}>
      <div className={styles.container}>
        <h2 className={styles.title}>АДМИНИСТРАТОРЫ</h2>
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
                  subscriber.user_info.first_name +
                  (subscriber.user_info.last_name || "")
                }
                image={subscriber.user_info.image}
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
