import style from "./style.module.css";
import row from "./image/row.svg";
import { Avatar } from "../avatar/Avatar";
import wave from "./image/wave.svg";
import cursor from "./image/cursor.svg";
import slots from "./image/slots.svg";
import share from "./image/share.svg";
import play from "./image/play.svg";
import lightning from "./image/lightning.svg";
import champ from "./image/champ.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tg } from "../../App";

export interface GetUserProfile {
  id: number;
  tgid: string;
  email: string | null;
  first_name: string;
  last_name: string | null;
  image: string | null;
}

interface StreamerInfo {
  id: number;
  name: string;
  count_sub: number;
  image: string;
  is_subscribed: boolean;
}

interface StreamerAdmin {
  id: number;
  streamer: number;
  streamer_info: StreamerInfo;
  user: number;
  role: string;
  add_url: string;
  add_date: string;
}
const MainPage = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<GetUserProfile | null>(null);
  const [admins, setAdmins] = useState<StreamerAdmin[] | []>([]);

  useEffect(() => {
    alert(location.pathname);
    tg.setHeaderColor("#efeff3");
    tg.setBackgroundColor("#efeff3");
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("https://api.bigstreamerbot.io/users/1/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Auth: tg.initData,
          "Telegram-User-ID":
            tg.initDataUnsafe.user?.id !== undefined
              ? tg.initDataUnsafe.user.id.toString()
              : "error",
        },
      });

      const res = await response.json();
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getAdminsList = async () => {
    try {
      const response = await fetch(
        "https://api.bigstreamerbot.io/streamer-admins/user/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Auth: tg.initData,
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setAdmins(res["streamer-admin"]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const menuItems = [
    {
      id: 1,
      text: "Стримы и стримеры",
      image: wave,
      st: "iconStreams",
    },
    {
      id: 2,
      text: "Онлайн казино",
      image: cursor,
      st: "iconCasino",
    },
    {
      id: 3,
      text: "Игры казино онлайн",
      image: slots,
      st: "iconGames",
    },
  ];

  const casinoItems = [
    {
      id: 1,
      text: "Играть",
      image: play,
      st: "iconPlay",
    },
    {
      id: 2,
      text: "Заработать",
      image: lightning,
      st: "iconEarn",
    },
    {
      id: 3,
      text: "Турниры",
      image: champ,
      st: "iconTour",
    },
    {
      id: 4,
      text: "Друзья",
      image: share,
      st: "iconFriends",
    },
  ];

  const handleClickMe = () => {
    nav("/me");
  };

  const handleClickStreamer = () => {
    nav("/streamer");
  };

  const HandleListItem = (id: number) => {
    if (id === 1) {
      nav("/");
    }
  };

  const streamerHandleClick = (id: number, is_subscribed: string) => {
    nav(`/streamer/${id}/${is_subscribed}`);
  };

  useEffect(() => {
    getUser();
    getAdminsList();
  }, []);

  return (
    <div className={style.MainPageBlock}>
      <p className={style.page_title}>НАСТРОЙКИ ЛИЧНОГО АККАУНТА</p>
      <div className={style.MainPageFlexItem}>
        <div className={style.flexBlock} onClick={() => handleClickMe()}>
          <div className={style.MainPage_Item}>
            <Avatar
              size={26}
              isLive={false}
              url={"https://api.bigstreamerbot.io" + String(user?.image)}
            ></Avatar>
            <div className={style.MainPage_ItemTextBlock}>
              <p className={style.item_title}>
                {user?.first_name + (user?.last_name || "")}
              </p>
              <p className={style.item_text}>
                Общая информация, статистика, платежная информация, кошельки,
                история ставок...
              </p>
            </div>
            <img src={row} alt="#" />
          </div>
        </div>
      </div>

      <p className={style.page_title}>НАСТРОЙКИ АККАУНТА АФФИЛЕЙТА</p>
      <div className={style.MainPageFlexItem}>
        {admins.map((item) => {
          return (
            <div
              onClick={() =>
                streamerHandleClick(
                  item.streamer,
                  item.streamer_info.is_subscribed.toString()
                )
              }
              className={style.flexBlock}
            >
              <div
                className={style.MainPage_Item}
                onClick={() => handleClickStreamer()}
              >
                <Avatar
                  size={26}
                  isLive={false}
                  url={
                    "https://api.bigstreamerbot.io/" +
                    String(item.streamer_info.image)
                  }
                ></Avatar>
                <div className={style.MainPage_ItemTextBlock}>
                  <p className={style.item_title}>{item.streamer_info.name}</p>
                  <p className={style.item_text}>
                    Стримы, розыгрыши, подписчики, ваш рейтинг казино,
                    реферальные ссылки...
                  </p>
                </div>
                <img src={row} alt="#" />
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.MainPageFlexItem1}>
        {menuItems.map((item) => (
          <div
            onClick={() => HandleListItem(item.id)}
            key={item.id}
            className={style.ListOfMenuItems}
          >
            <div className={style.iconBox}>
              <span className={style[item.st]}>
                <img src={item.image} alt="Wave Icon" />
              </span>
            </div>
            <div className={style.innerFlexBlock}>
              <p className={style.menuItem_text}>{item.text}</p>
              <img src={row} alt="Row Icon" />
            </div>
          </div>
        ))}
      </div>

      <p className={style.page_title_casino}>FREE CASINO</p>

      <div className={style.MainPageFlexItem1}>
        {casinoItems.map((item) => (
          <div key={item.id} className={style.ListOfMenuItems}>
            <div className={style.iconBox}>
              <span className={style[item.st]}>
                <img src={item.image} alt="Wave Icon" />
              </span>
            </div>
            <div className={style.innerFlexBlock}>
              <p className={style.menuItem_text}>{item.text}</p>
              <img src={row} alt="Row Icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
