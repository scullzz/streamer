import style from "./style.module.css";
import twitch from "./image/twtch.svg";
import youtube from "./image/youtube.svg";
import "./style.css";
import { useEffect, useState } from "react";
interface GetVideo {
  image: string;
  link: string;
  platform: string;
  viewers: number;
  title: string;
}
const StreamerVideo = ({ image, link, platform, viewers, title }: GetVideo) => {
  const [selectedStyle, setSelectedStyle] = useState<string>("number1");
  const [selectedImage, setSelectedImage] = useState<string>();
  const getImage = () => {
    if (platform === "twitch") {
      setSelectedImage(twitch);
      setSelectedStyle("number1");
    } else if (platform === "youtube") {
      setSelectedImage(youtube);
      setSelectedStyle("number2");
    } else if (platform === "kick") {
      setSelectedImage(youtube);
      setSelectedStyle("number3");
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div className={style.VideoBlock}>
      <img className={style.image} src={image} alt="#" />
      <div className={style.mainBlock}>
        <div className={style.video_title}>
          <div className={style.video_first_title}>
            <img src={selectedImage} alt="#" />
            <span className={style.link}>{link}</span>
          </div>
          <div className={`${style[selectedStyle]}`}>{viewers}</div>
        </div>
        <p className={style.video_description}>{title}</p>
      </div>
    </div>
  );
};

export default StreamerVideo;
