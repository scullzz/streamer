import { useState } from "react";
import { Avatar } from "../avatar/Avatar";
import styles from "./style.module.css";
import check from "./image/check.svg";
import Subscribe from "../(un)subscribe/Subscribe";

interface ILiveStreamerItemProps {
  imgUrl: string;
  name: string;
  subscribers: number;
  youtubeOnline?: number;
  twitchOnline?: number;
  kickOnline?: number;
  is_subscribed: boolean;
}

const LiveStreamerItem = ({
  imgUrl,
  name,
  subscribers,
  youtubeOnline,
  twitchOnline,
  kickOnline,
  is_subscribed,
}: ILiveStreamerItemProps) => {
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
        <Avatar size={64} isLive={false} url={imgUrl} />
      </div>
      <div className={styles.profileInfoBlock}>
        <div className={styles.profileInfo}>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.subscribers}>{subscribers} подписчиков</div>
            <div className={styles.online}>
              Онлайн:
              {youtubeOnline !== null ? (
                <span className={styles.redBadge}>{youtubeOnline}</span>
              ) : null}
              {twitchOnline !== null ? (
                <span className={styles.purpleBadge}>{twitchOnline}</span>
              ) : null}
              {kickOnline !== null ? (
                <span className={styles.greenBadge}>{kickOnline}</span>
              ) : null}
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
