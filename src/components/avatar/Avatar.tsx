import styles from "./style.module.css";
import { useCheckImageCorrect } from "../../functions/useCheckImageCorrect";
import { IsLive } from "../is_live/IsLive";
import { Initials } from "../../functions/getInitials";
export interface AvatarProps {
  url?: string | undefined;
  isLive?: boolean;
  initials?: Initials;
  size?: number;
}

export const Avatar = ({ url, isLive, initials, size = 94 }: AvatarProps) => {
  const correct = useCheckImageCorrect(url);
  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      {correct ? (
        <img
          src={url}
          alt="фото профиля"
          className={styles.avatar_body}
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="menu-item__icon"
          style={{
            backgroundColor: initials?.color,
            width: size,
            height: size,
          }}
        >
          <span className="menu-item__text">{initials?.initials}</span>
        </div>
      )}
      {isLive && <IsLive></IsLive>}
    </div>
  );
};
