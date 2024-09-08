import { useState } from "react";
import { Avatar } from "../avatar/Avatar";
import styles from "./style.module.css";
import check from "./image/check.svg";
import Subscribe from "../(un)subscribe/Subscribe";

interface ILiveStreamerItemProps {
  streamer_id: number;
  imgUrl: string;
  name: string;
  youtubeOnline?: number;
  twitchOnline?: number;
  kickOnline?: number;
  is_subscribed: boolean;
  subscriptions_count: number;
}

const LiveStreamerItem = ({
  imgUrl,
  name,
  youtubeOnline,
  twitchOnline,
  kickOnline,
  is_subscribed,
  subscriptions_count,
  streamer_id,
}: ILiveStreamerItemProps) => {
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const OpenModal = async () => {
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
            <div className={styles.subscribers}>
              {subscriptions_count} подписчиков
            </div>
            <div className={styles.online}>
              Онлайн:
              {youtubeOnline ? (
                <span className={styles.redBadge}>{youtubeOnline}</span>
              ) : null}
              {twitchOnline ? (
                <span className={styles.purpleBadge}>{twitchOnline}</span>
              ) : null}
              {kickOnline ? (
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
        <Subscribe
          isSubscribed={is_subscribed}
          onClose={closeModal}
          streamerId={streamer_id}
        />
      )}
    </div>
  );
};

export default LiveStreamerItem;
