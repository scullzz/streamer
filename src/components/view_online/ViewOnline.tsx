import { useLocation } from "react-router-dom";
import { SectionHeader } from "../section_header/SectionHeader";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import trash from "./image/trash.svg";
const ViewOnline = () => {
  const location = useLocation();
  const { link, platform, viewers, title } = location.state;
  const backPage = () => {
    window.history.back();
  };

  const [selectedStyle, setSelectedStyle] = useState<string>("number1");
  const getImage = () => {
    console.log(platform);
    if (platform === "Twitch") {
      setSelectedStyle("number1");
    } else if (platform === "YouTube") {
      setSelectedStyle("number2");
    } else if (platform === "Kick") {
      setSelectedStyle("number3");
    }
  };
  function convertYouTubeUrlToEmbed(url: any) {
    const videoIdMatch = url.match(
      /(?:\?v=|&v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/
    );

    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  }
  const youtubeEmbedLink = convertYouTubeUrlToEmbed(link);
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div className={styles.back}>
      <SectionHeader
        left={<span onClick={() => backPage()}>Назад</span>}
        center={<span style={{ color: "white" }}>Clash of Slots</span>}
      />
      <div className={styles.streamContainer}>
        <div className={styles.streamInfo}>
          <iframe
            width="100%"
            height="210px"
            src={youtubeEmbedLink}
            title={title}
            className={styles.streamThumbnail}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => {
            window.location.href = link;
          }}
          className={styles.twitchButton}
        >
          <div className={styles.buttonblock}>
            <span className={`${styles[selectedStyle]}`}>{viewers}</span>
            <span> Смотреть на {platform}</span>
          </div>
        </button>
      </div>

      {/* <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>Чат</div>
        <div className={styles.chatMessages}>
          <div className={styles.chatInput}>
            <input type="text" placeholder="Отправить сообщение" />
          </div>
        </div>
      </div> */}

      <div className={styles.ratingContainer}>
        <h3 className={styles.p3_changed}>Рейтинг онлайн казино</h3>
        <div className={styles.casinoList}>
          <div className={styles.casinoItem}>
            <div className={styles.miniFlex}>
              <div className={styles.casinoLogo}>
                <img src={trash} alt="Auf Casino" />
              </div>
              <div className={styles.casinoInfo}>
                <span className={styles.casinoMainText}>Auf Casino</span>
                <span className={styles.casinoMiniText}>Промокод: COBRIK</span>
              </div>
            </div>
            <button className={styles.playButton}>Играть</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOnline;
