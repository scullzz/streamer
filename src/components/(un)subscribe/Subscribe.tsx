import { useEffect, useState } from "react";
import { Avatar } from "../avatar/Avatar";
import { Checker } from "../checker/Checker";
import exit from "./image/exit.svg";
import style from "./style.module.css";
import SureModal from "../sure_to_unsub/MakeSure";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { subscribeToStreamer } from "../../redux/streamer_list";
import { unsubscribeFromStreamer } from "../../redux/streamer_list";
import { tg } from "../../App";
interface ISubscribe {
  streamerId: number;
  isSubscribed: boolean;
  onClose: () => void;
  onCustomSubscribe?: () => void;
  name: string;
  imgUrl: string;
}

const Subscribe = ({
  isSubscribed,
  onClose,
  onCustomSubscribe,
  streamerId,
  name,
  imgUrl,
}: ISubscribe) => {
  const [getNotification, setNotification] = useState(true);
  const [youtubeNotification, setYoutubeNotification] = useState(true);
  const [twitchNotification, setTwitchNotification] = useState(true);
  const [kickNotification, setKickNotification] = useState(true);
  const [raffleNotification, setRaffleNotification] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const element = document.getElementById("subscribeBlock");
    const overlay = document.getElementById("overlay");

    if (element && overlay) {
      setTimeout(() => {
        element.classList.add(style.show);
        overlay.classList.add(style.show);
      }, 0);
    }
  }, []);

  const changeNotifications = async () => {
    try {
      await fetch(
        `https://api.bigstreamerbot.io/subscriptions/${streamerId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
            Auth: tg.initData,
          },
          body: JSON.stringify({
            notification_youtube: youtubeNotification,
            notification_twitch: twitchNotification,
            notification_kick: kickNotification,
            notification_raffle: raffleNotification,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    const element = document.getElementById("subscribeBlock");
    const overlay = document.getElementById("overlay");

    if (element && overlay) {
      isSubscribed === true && changeNotifications();
      element.classList.add(style.close);
      overlay.classList.add(style.close);
      setTimeout(() => {
        onClose();
        overlay.classList.remove(style.show, style.close);
      }, 300);
    }
  };

  const SubscribeButton = async () => {
    try {
      if (typeof onCustomSubscribe === "function") {
        onCustomSubscribe();
      }
      await fetch(
        `https://api.bigstreamerbot.io/subscriptions/${streamerId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
            Auth: tg.initData,
          },
          body: JSON.stringify({
            is_sub: true,
            notification_youtube: youtubeNotification,
            notification_twitch: twitchNotification,
            notification_kick: kickNotification,
            notification_raffle: raffleNotification,
          }),
        }
      );
      closeModal();
      dispatch(subscribeToStreamer(streamerId));
    } catch (err) {
      console.log(err);
    }
  };

  const approveUnSub = async () => {
    try {
      await fetch(
        `https://api.bigstreamerbot.io/subscriptions/${streamerId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
            Auth: tg.initData,
          },
          body: JSON.stringify({
            is_sub: false,
            date_unsubscribe: new Date(),
            notification_youtube: false,
            notification_twitch: false,
            notification_kick: false,
            notification_raffle: false,
          }),
        }
      );
      closeModal();
      dispatch(unsubscribeFromStreamer(streamerId));
    } catch (err) {
      console.log(err);
    }
  };

  const UnSubscribeButton = async () => {
    try {
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getNotificationsByStreamerId = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/subscriptions/${streamerId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
            Auth: tg.initData,
          },
        }
      );
      const res = await response.json();

      setRaffleNotification(res.notification_raffle);
      setYoutubeNotification(res.notification_youtube);
      setKickNotification(res.notification_kick);
      setTwitchNotification(res.notification_twitch);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotificationsByStreamerId();
  }, []);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.Main}>
      <div
        onClick={() => closeModal()}
        id="overlay"
        className={style.overlay}
      ></div>
      <div id="subscribeBlock" className={style.subscribeBlock}>
        <div className={style.exitImg}>
          <img onClick={closeModal} src={exit} alt="" />
        </div>
        <div className={style.streamerAva}>
          <Avatar size={94} isLive={false} url={imgUrl} />
          <p className={style.ava_text}>
            {isSubscribed === false ? "Подписаться" : "Отписаться"} на {name}?
          </p>
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

        {isSubscribed === false ? (
          <div
            onClick={() => SubscribeButton()}
            className={style.actionButtonSub}
          >
            <button className={style.sub_text}>Подписаться</button>
          </div>
        ) : (
          <div
            onClick={() => UnSubscribeButton()}
            className={style.actionButtonUnSub}
          >
            <button className={style.un_sub_text}>Отписаться</button>
          </div>
        )}
      </div>

      <SureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        approve={approveUnSub}
        id={streamerId}
        name={name}
      />
    </div>
  );
};

export default Subscribe;
