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
  scrollHandle: () => any;
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
  scrollHandle,
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
      <div onClick={() => scrollHandle()} className={styles.profileImage}>
        <Avatar size={64} isLive={false} url={imgUrl} />
      </div>
      <div onClick={() => scrollHandle()} className={styles.profileInfoBlock}>
        <div className={styles.profileInfo}>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.subscribers}>
              {subscriptions_count} подписчиков
            </div>
            <div className={styles.online}>
              {youtubeOnline ? (
                <div>
                  <span>Онлайн:</span>
                  <span className={styles.redBadge}>{youtubeOnline}</span>
                </div>
              ) : null}
              {twitchOnline ? (
                <div>
                  <span>Онлайн:</span>
                  <span className={styles.purpleBadge}>{twitchOnline}</span>
                </div>
              ) : null}
              {kickOnline ? (
                <div>
                  <span>Онлайн:</span>
                  <span className={styles.greenBadge}>{kickOnline}</span>
                </div>
              ) : null}
            </div>
          </div>
          {is_subscribed ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                OpenModal();
              }}
              className={styles.subscribedButton}
            >
              <img src={check} alt="#" />
              Подписан
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                OpenModal();
              }}
              className={styles.willSubscribeButton}
            >
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
          imgUrl={imgUrl}
          name={name}
        />
      )}
    </div>
  );
};

export default LiveStreamerItem;
