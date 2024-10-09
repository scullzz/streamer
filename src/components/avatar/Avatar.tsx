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

export const Avatar = ({ url, isLive, size = 94 }: AvatarProps) => {
  const correct = useCheckImageCorrect(url);

  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      {url && correct ? (
        <img
          src={url}
          alt="фото профиля"
          className={styles.avatar_body}
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className={styles.skeleton} // Анимация скелетона
          style={{
            width: size,
            height: size,
          }}
        ></div>
      )}
      {isLive && <IsLive />}
    </div>
  );
};