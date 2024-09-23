import { useState } from "react";
import { Avatar } from "../avatar/Avatar";
import styles from "./style.module.css";
import check from "./image/check.svg";
import Subscribe from "../(un)subscribe/Subscribe";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const OpenModal = async () => {
    setSubscribeModalOpen(true);
  };

  const closeModal = () => {
    setSubscribeModalOpen(false);
  };
  const moveToStreamerPage = () => {
    nav(`/streamer/${streamer_id}/${is_subscribed}`);
  };

  return (
    <div className={styles.profileContainer}>
      <div onClick={() => moveToStreamerPage()} className={styles.profileImage}>
        <Avatar size={64} isLive={false} url={imgUrl} />
      </div>
      <div
        onClick={() => moveToStreamerPage()}
        className={styles.profileInfoBlock}
      >
        <div className={styles.profileInfo}>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.subscribers}>
              {subscriptions_count} подписчиков
            </div>
            <div className={styles.online}>
              {youtubeOnline ? (
                <span className={styles.redBadge}>Онлайн:{youtubeOnline}</span>
              ) : null}
              {twitchOnline ? (
                <span className={styles.purpleBadge}>
                  Онлайн:{twitchOnline}
                </span>
              ) : null}
              {kickOnline ? (
                <span className={styles.greenBadge}>Онлайн:{kickOnline}</span>
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
