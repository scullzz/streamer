import style from "./style.module.css";
import vid from "./image/vid.png";
import twitch from "./image/twtch.svg";
import "./style.css";
const StreamerVideo = () => {
  return (
    <div className={style.VideoBlock}>
      <img className={style.image} src={vid} alt="#" />
      <div className={style.mainBlock}>
        <div className={style.video_title}>
          <div className={style.video_first_title}>
            <img src={twitch} alt="#" />
            <span className={style.link}>www.twitch.tv/cobrik</span>
          </div>
          <div className={style.number}>91</div>
        </div>
        <p className={style.video_description}>
          Хозяин и BetKat Ловят ЗАНОСЫ НЕДЕЛИ в Прямом Эфире! Заносы Недели
          Прямой Эфир Стрим Онлайн
        </p>
      </div>
    </div>
  );
};

export default StreamerVideo;
