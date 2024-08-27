import { Avatar, AvatarProps } from "../avatar/Avatar";
import style from "./style.module.css";
interface IStreamerPreviewProps extends AvatarProps {
  details?: string;
  name: string;
  isLive: boolean;
  headerStyles?: React.CSSProperties;
  img?: string | undefined;
}

export const StreamerPreview = ({
  name,
  details,
  isLive,
  headerStyles,
  img,
  ...rest
}: IStreamerPreviewProps) => {
  return (
    <div className={style.streamer__info}>
      <Avatar url={img} {...rest} isLive={isLive}></Avatar>
      <span className={style.header_text} style={headerStyles}>
        {name}
      </span>
      {details && <span className={style.details_text}>{details}</span>}
    </div>
  );
};
