import { useEffect, useState } from "react";
import { Avatar } from "../avatar/Avatar";
import { Checker } from "../checker/Checker";
import exit from "./image/exit.svg";
import style from "./style.module.css";

interface ISubscribe {
  isSubscribed: boolean;
  onClose: () => void; // Добавляем функцию для закрытия модального окна
}

const Subscribe = ({ isSubscribed, onClose }: ISubscribe) => {
  const [getNotification, setNotification] = useState(false);
  const [youtubeNotification, setYoutubeNotification] = useState(true);
  const [twitchNotification, setTwitchNotification] = useState(false);
  const [kickNotification, setKickNotification] = useState(false);
  const [raffleNotification, setRaffleNotification] = useState(false);

  useEffect(() => {
    const element = document.getElementById("subscribeBlock");
    if (element) {
      setTimeout(() => {
        element.classList.add(style.show);
      }, 0);
    }
  }, []);

  const closeModal = () => {
    const element = document.getElementById("subscribeBlock");
    if (element) {
      element.classList.add(style.close);
      setTimeout(onClose, 300); // Ждем завершения анимации, затем вызываем onClose
    }
  };

  return (
    <div id="subscribeBlock" className={style.subscribeBlock}>
      <div className={style.exitImg}>
        <img onClick={closeModal} src={exit} alt="" />
      </div>
      <div className={style.streamerAva}>
        <Avatar
          size={94}
          isLive={false}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s"
        />
        <p className={style.ava_text}>Подписаться на Casino_Malaya?</p>
      </div>
      <div className={style.CheckerListFirstItem}>
        <Checker
          offColor="#4A4A4A"
          text="Получать сообщения от стримера (через бота)"
          value={getNotification}
          onChange={setNotification}
        />
      </div>

      <div className={style.CheckerListSecondItem}>
        <Checker
          text="Оповещать о начале стримов на YouTube.com"
          value={youtubeNotification}
          onChange={setYoutubeNotification}
        />
        <div className={style.line}></div>
        <Checker
          text="Оповещать о начале стримов на Twitch.tv"
          value={twitchNotification}
          onChange={setTwitchNotification}
        />
        <div className={style.line}></div>
        <Checker
          text="Оповещать о начале стримов на Kick.com"
          value={kickNotification}
          onChange={setKickNotification}
        />
      </div>

      <div className={style.CheckerListFirstItem}>
        <Checker
          text="Оповещать о розыгрышах в боте"
          value={raffleNotification}
          onChange={setRaffleNotification}
        />
      </div>

      <div
        className={
          isSubscribed === false
            ? style.actionButtonSub
            : style.actionButtonUnSub
        }
      >
        {isSubscribed === false ? (
          <p className={style.sub_text}>Подписаться</p>
        ) : (
          <p className={style.un_sub_text}>Отписаться</p>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
