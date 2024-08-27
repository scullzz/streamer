import { useState } from "react";
import { Avatar } from "../avatar/Avatar";
import styles from "./style.module.css";
import check from "./image/check.svg";
import Subscribe from "../(un)subscribe/Subscribe";

interface ILiveStreamerItemProps {
  imgUrl: string;
  name: string;
  subscribers: number;
  youtubeOnline: number;
  twitchOnline: number;
  kickOnline: number;
  is_subscribed: boolean;
}

const LiveStreamerItem = ({ is_subscribed }: ILiveStreamerItemProps) => {
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const OpenModal = () => {
    setSubscribeModalOpen(true);
  };

  const closeModal = () => {
    setSubscribeModalOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileImage}>
        <Avatar
          size={64}
          isLive={false}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s"
        />
      </div>
      <div className={styles.profileInfoBlock}>
        <div className={styles.profileInfo}>
          <div>
            <div className={styles.name}>Casino_Malaya</div>
            <div className={styles.subscribers}>777 подписчиков</div>
            <div className={styles.online}>
              Онлайн: <span className={styles.redBadge}>1253</span>{" "}
              <span className={styles.purpleBadge}>51</span>
            </div>
          </div>
          {is_subscribed ? (
            <button onClick={OpenModal} className={styles.subscribedButton}>
              <img src={check} alt="#" />
              Подписан
            </button>
          ) : (
            <button onClick={OpenModal} className={styles.willSubscribeButton}>
              Подписаться
            </button>
          )}
        </div>
        <div className={styles.line}></div>
      </div>
      {isSubscribeModalOpen && (
        <Subscribe isSubscribed={is_subscribed} onClose={closeModal} />
      )}
    </div>
  );
};

export default LiveStreamerItem;
