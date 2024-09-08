import { useEffect, useState } from "react";
import { Avatar } from "../avatar/Avatar";
import { Checker } from "../checker/Checker";
import exit from "./image/exit.svg";
import style from "./style.module.css";

interface ISubscribe {
  streamerId: number;
  isSubscribed: boolean;
  onClose: () => void;
}

const Subscribe = ({ isSubscribed, onClose, streamerId }: ISubscribe) => {
  
  const [getNotification, setNotification] = useState(true);
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
      setTimeout(onClose, 300);
    }
  };

  const SubscribeButton = async () => {
    try {
      console.log(streamerId)
      // const response = await fetch(
      //   "https://api.bigstreamerbot.io/subscriptions",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Telegram-User-ID": "235519518",
      //       Auth: "M1bCSx92W6",
      //     },
      //     body: JSON.stringify({
      //       streamer: streamerId,
      //       is_sub: true,
      //     }),
      //   }
      // );

      // if (response.ok) {
      //   const res = await response.json();
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const UnSubscribeButton = async () => {
    try {
      // const response = await fetch(
      //   "https://api.bigstreamerbot.io/subscriptions",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Telegram-User-ID": "235519518",
      //       Auth: "M1bCSx92W6",
      //     },
      //     body: JSON.stringify({
      //       streamer: streamerId,
      //       is_sub: true,
      //       date_unsubscribe: new Date(),
      //     }),
      //   }
      // );
    } catch (err) {
      console.log(err);
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
          status={true}
          color="#000000"
          text="Получать сообщения от стримера (через бота)"
          value={getNotification}
          onChange={setNotification}
        />
      </div>

      <div className={style.CheckerListSecondItem}>
        <Checker
          status={false}
          text="Оповещать о начале стримов на YouTube.com"
          value={youtubeNotification}
          onChange={setYoutubeNotification}
        />
        <div className={style.line}></div>
        <Checker
          status={false}
          text="Оповещать о начале стримов на Twitch.tv"
          value={twitchNotification}
          onChange={setTwitchNotification}
        />
        <div className={style.line}></div>
        <Checker
          status={false}
          text="Оповещать о начале стримов на Kick.com"
          value={kickNotification}
          onChange={setKickNotification}
        />
      </div>

      <div className={style.CheckerListFirstItem}>
        <Checker
          status={false}
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
          <button onClick={() => SubscribeButton()} className={style.sub_text}>
            Подписаться
          </button>
        ) : (
          <button
            onClick={() => UnSubscribeButton()}
            className={style.un_sub_text}
          >
            Отписаться
          </button>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
