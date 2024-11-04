import { Avatar, AvatarProps } from "../avatar/Avatar";
import style from "./style.module.css";
interface IStreamerPreviewProps extends AvatarProps {
  details?: string;
  name: string;
  isLive: boolean;
  headerStyles?: React.CSSProperties;
  img?: string | undefined;
  role?: string;
  move?: () => void;
  hidden_status?: boolean;
}

export const StreamerPreview = ({
  name,
  details,
  isLive,
  headerStyles,
  img,
  role,
  move,
  hidden_status = true,
  ...rest
}: IStreamerPreviewProps) => {
  return (
    <div className={style.streamer__info}>
      <div className={style.block}>
        <Avatar url={img} {...rest} isLive={isLive}></Avatar>
        {role === "user" && hidden_status === true ? null : (
          <div onClick={() => move && move()} className={style.changeBlock}>
            Изм.
          </div>
        )}
      </div>
      <span className={style.header_text} style={headerStyles}>
        {name}
      </span>
      {details && <span className={style.details_text}>{details}</span>}
    </div>
  );
};
