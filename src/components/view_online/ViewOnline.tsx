import { useLocation } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import trash from "./image/trash.svg";
import users from "./image/users.svg";
import { GetUserProfile } from "../main_page/MainPage";
import { tg } from "../../App";
import { Avatar } from "../avatar/Avatar";
import { SwipeableDrawer, Box, Typography, TextField } from "@mui/material";

const ViewOnline = () => {
  const location = useLocation();
  const [user, setUser] = useState<GetUserProfile | null>(null);

  const { link, platform, viewers, title } = location.state;
  // const backPage = () => {
  //   window.history.back();
  // };

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
  function convertUrlToEmbed(url: any) {
    if (platform === "YouTube") {
      const videoIdMatch = url.match(
        /(?:\?v=|&v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/
      );

      if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (platform === "Twitch") {
      const parts = url.split("/");
      return `https://player.twitch.tv/?channel=${
        parts[parts.length - 1]
      }&parent=bigstreamerbot.io&muted=true`;
    } else {
      return url;
    }
  }

  const embedLink = convertUrlToEmbed(link);
  useEffect(() => {
    getUser();
    getImage();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("https://api.bigstreamerbot.io/users/1/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Auth: tg.initData,
          "Telegram-User-ID":
            tg.initDataUnsafe.user?.id !== undefined
              ? tg.initDataUnsafe.user.id.toString()
              : "error",
        },
      });

      const res = await response.json();
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  const [panelPosition, setPanelPosition] = useState("closed");
  const [startY, setStartY] = useState(0);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setPanelPosition((prev) => (prev === "closed" ? "half" : "closed"));
  };

  const handleTouchStart = (e: any) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: any) => {
    const endY = e.changedTouches[0].clientY;
    const swipeUp = startY - endY > 100;
    const swipeDown = endY - startY > 100;

    if (swipeUp && panelPosition === "half") {
      setPanelPosition("full"); // Swipe up from half to full
    } else if (swipeDown && panelPosition === "full") {
      setPanelPosition("half"); // Swipe down from full to half
    } else if (swipeDown && panelPosition === "half") {
      setPanelPosition("closed");
    }
  };

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <div className={styles.streamContainer}>
        {platform === "Kick" ? (
          <div className={styles.kickBlock}>
            <button className={styles.kick_button}>Смотреть на kick.com</button>
            <span className={styles.kick_text}>
              Kick пока не поделился API, поэтому просмотр стримов через
              мини-приложение телеграм пока не доступно...
            </span>
          </div>
        ) : (
          <div className={styles.streamInfo}>
            <iframe
              width="100vw"
              height="211px"
              src={embedLink}
              title={title}
              className={styles.streamThumbnail}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <div className={styles.back}>
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

        <div onClick={toggleChat} className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <span className={styles.chatHeader_text1}>Чат</span>
            <span className={styles.chatHeader_text2}>
              <img src={users} alt="#" /> {viewers}
            </span>
          </div>
          <div className={styles.chatMessages}>
            <div className={styles.chatInput}>
              <Avatar
                size={24}
                isLive={false}
                url={"https://api.bigstreamerbot.io" + String(user?.image)}
              ></Avatar>
              <input type="text" placeholder="Отправить сообщение" />
            </div>
          </div>
        </div>

        <div className={styles.ratingContainer}>
          <div className={styles.blockFlex}>
            <h3 className={styles.p3_changed}>Рейтинг онлайн казино</h3>
            <span className={styles.SeeAll}>Смотреть весь</span>
          </div>
          <div className={styles.casinoList}>
            <div className={styles.casinoItem}>
              <div className={styles.miniFlex}>
                <div className={styles.casinoLogo}>
                  <img src={trash} alt="Auf Casino" />
                </div>
                <div className={styles.casinoInfo}>
                  <span className={styles.casinoMainText}>Auf Casino</span>
                  <span className={styles.casinoMiniText}>
                    Промокод: COBRIK
                  </span>
                </div>
              </div>
              <button className={styles.playButton}>Играть</button>
            </div>
          </div>
        </div>

        <SwipeableDrawer
          anchor="bottom"
          open={panelPosition !== "closed"}
          onClose={() => setPanelPosition("closed")}
          onOpen={() => setPanelPosition("half")}
          disableSwipeToOpen={true}
          swipeAreaWidth={0}
          sx={{
            "& .MuiDrawer-paper": {
              height:
                panelPosition === "full"
                  ? "100%"
                  : panelPosition === "half"
                  ? "70%"
                  : "0%",
              transition: "height 0.3s ease",
              backgroundColor: "#131313",
              color: "#fff",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 1,
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.stick}></div>
            </Box>
            <Box sx={{ flex: 1, padding: 2 }}>
              <Typography>User1: Hello!</Typography>
              <Typography>User2: How are you?</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: 1,
              borderTop: "1px solid #555",
              backgroundColor: "#222",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Отправить сообщение..."
              value={message}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#aaa",
                  },
                },
              }}
            />
          </Box>
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default ViewOnline;
