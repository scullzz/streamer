import style from "./style.module.css";
import twitch from "./image/twtch.svg";
import youtube from "./image/youtube.svg";
import kick from "./image/kick.svg";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface GetVideo {
  name: string;
  image: string;
  link: string;
  platform: string;
  viewers: number;
  title: string;
}
const StreamerVideo = ({
  name,
  image,
  link,
  platform,
  viewers,
  title,
}: GetVideo) => {
  const nav = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>("number1");
  const [selectedImage, setSelectedImage] = useState<string>();
  const [changedLink, setChangedLink] = useState<string>();
  const getImage = () => {
    console.log(platform);
    if (platform === "Twitch") {
      setSelectedImage(twitch);
      setSelectedStyle("number1");
    } else if (platform === "YouTube") {
      setSelectedImage(youtube);
      setSelectedStyle("number2");
    } else if (platform === "Kick") {
      setSelectedImage(kick);
      setSelectedStyle("number3");
    }
  };

  const getUpdatedLink = () => {
    if (platform === "Twitch") {
      setChangedLink(`www.twitch.tv/${name}`);
    } else if (platform === "YouTube") {
      setChangedLink(`www.youtube.com/${name}`);
    } else if (platform === "Kick") {
      setChangedLink(`www.kick.com/${name}`);
    }
  };
  const moveToVideoWatch = () => {
    nav("/streamer/online", {
      state: { image, link, platform, viewers, title },
    });
  };
  useEffect(() => {
    getImage();
    getUpdatedLink();
  }, []);
  return (
    <div onClick={() => moveToVideoWatch()} className={style.VideoBlock}>
      <img className={style.image} src={image} alt="#" />
      <div className={style.mainBlock}>
        <div className={style.video_title}>
          <div className={style.video_first_title}>
            <img src={selectedImage} alt="#" />
            <span className={style.link}>{changedLink}</span>
          </div>
          <div className={`${style[selectedStyle]}`}>{viewers}</div>
        </div>
        <p className={style.video_description}>{title}</p>
      </div>
    </div>
  );
};

export default StreamerVideo;
