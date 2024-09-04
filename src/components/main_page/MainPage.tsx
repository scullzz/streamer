import style from "./style.module.css";
import row from "./image/row.svg";
import { Avatar } from "../avatar/Avatar";
import wave from "./image/wave.svg";
import cursor from "./image/cursor.svg";
import slots from "./image/slots.svg";
import share from "./image/share.svg";
import play from "./image/play.svg";
import lightning from "./image/ligthning.svg";
import champ from "./image/champ.svg";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const nav = useNavigate();
  const menuItems = [
    {
      id: 1,
      text: "Стримы и стримеры",
      image: wave,
    },
    {
      id: 2,
      text: "Онлайн казино",
      image: cursor,
    },
    {
      id: 3,
      text: "Игры казино онлайн",
      image: slots,
    },
    {
      id: 4,
      text: "Друзья",
      image: share,
    },
  ];

  const casinoItems = [
    {
      id: 1,
      text: "Играть",
      image: play,
    },
    {
      id: 2,
      text: "Заработать",
      image: lightning,
    },
    {
      id: 3,
      text: "Турниры",
      image: champ,
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

  return (
    <div className={style.MainPageBlock}>
      <div className={style.MainPageFlexItem}>
        <p className={style.page_title}>Ваш личный аккаунт</p>
        <div className={style.flexBlock} onClick={() => handleClickMe()}>
          <div className={style.MainPage_Item}>
            <Avatar
              size={26}
              isLive={false}
              url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s"
            ></Avatar>
            <div className={style.MainPage_ItemTextBlock}>
              <p className={style.item_title}>Cobrik</p>
              <p className={style.item_text}>
                Профиль, статистика, безопасность, платежная информация,
                кошелек, история ставок...
              </p>
            </div>
            <img src={row} alt="#" />
          </div>
          <div className={style.line}></div>
        </div>
      </div>

      <div className={style.MainPageFlexItem}>
        <p className={style.page_title}>Аккаунт аффилейта</p>
        <div className={style.flexBlock}>
          <div
            className={style.MainPage_Item}
            onClick={() => handleClickStreamer()}
          >
            <Avatar
              size={26}
              isLive={false}
              url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s"
            ></Avatar>
            <div className={style.MainPage_ItemTextBlock}>
              <p className={style.item_title}>Cobrik</p>
              <p className={style.item_text}>
                Настройки стримов, розыгрыши, подписчики, рейтинг казино,
                реферальные ссылки...
              </p>
            </div>
            <img src={row} alt="#" />
          </div>
          <div className={style.line}></div>
        </div>
      </div>

      <div className={style.MainPageFlexItem}>
        {menuItems.map((item) => (
          <div
            onClick={() => HandleListItem(item.id)}
            key={item.id}
            className={style.ListOfMenuItems}
          >
            <div className={style.innerFlexBlock}>
              <img src={item.image} alt="Wave Icon" />
              <p className={style.menuItem_text}>{item.text}</p>
            </div>
            <img src={row} alt="Row Icon" />
          </div>
        ))}
        <div className={style.line1}></div>
      </div>

      <div className={style.MainPageFlexItem}>
        <p className={style.page_title_casino}>Аккаунт аффилейта</p>

        {casinoItems.map((item) => (
          <div key={item.id} className={style.ListOfMenuItems}>
            <div className={style.innerFlexBlock}>
              <img src={item.image} alt="Wave Icon" />
              <p className={style.menuItem_text}>{item.text}</p>
            </div>
            <img src={row} alt="Row Icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
