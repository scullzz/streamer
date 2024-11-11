import { useLocation } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import trash from "./image/trash.svg";
import users from "./image/users.svg";
import { GetUserProfile } from "../main_page/MainPage";
import { tg } from "../../App";
import { Avatar } from "../avatar/Avatar";
import { Box, TextField, Drawer } from "@mui/material";
import userI from "./image/user.svg";
import settings from "./image/settings.svg";
import close from "./image/close.svg";
import blackB from "./image/blackB.svg";

const ViewOnline = () => {
  const arr = [
    {
      type: "YouTube",
      name: "First",
      message: "first message",
    },
    {
      type: "Kick",
      name: "Second",
      message: "kick message",
    },
    {
      type: "Twitch",
      name: "Third",
      message: "twitch message",
    },
    {
      type: "Bot",
      name: "Fourth",
      message: "bot message",
    },
    {
      type: "YouTube",
      name: "Fifth",
      message: "another YouTube message",
    },
    {
      type: "Kick",
      name: "Sixth",
      message: "another Kick message",
    },
    {
      type: "Twitch",
      name: "Seventh",
      message: "another Twitch message",
    },
    {
      type: "Bot",
      name: "Eighth",
      message: "another bot message",
    },
  ];

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

  const [panelPosition, setPanelPosition] = useState<any>("closed");
  const [startY, setStartY] = useState(0);
  const [message, setMessage] = useState();
  const [currentHeight, setCurrentHeight] = useState<any>(0);

  const toggleChat = () => {
    setPanelPosition((prev: any) => (prev === "closed" ? "half" : "closed"));
    setCurrentHeight(panelPosition === "closed" ? "70vh" : "0vh");
  };

  const handleStickTouchStart = (e: any) => {
    setStartY(e.touches[0].clientY);
  };

  const handleStickTouchMove = (e: any) => {
    const touchY = e.touches[0].clientY;
    const deltaY = startY - touchY;
    let newHeight = 0;

    if (panelPosition === "half" || panelPosition === "closed") {
      newHeight = Math.min(
        Math.max(70 + (deltaY / window.innerHeight) * 100, 0),
        100
      );
    } else if (panelPosition === "full") {
      newHeight = Math.min(
        Math.max(100 + (deltaY / window.innerHeight) * 100, 70),
        100
      );
    }

    setCurrentHeight(`${newHeight}vh`);
  };

  const handleStickTouchEnd = () => {
    const finalHeight = parseFloat(currentHeight);

    // Snap to closest position
    if (finalHeight > 75) {
      setPanelPosition("full");
      setCurrentHeight("100vh");
    } else if (finalHeight > 25) {
      setPanelPosition("half");
      setCurrentHeight("70vh");
    } else {
      setPanelPosition("closed");
      setCurrentHeight("0vh");
    }
  };

  const handleInputChange = (event: any) => {
    setMessage(event.target.value);
  };

  const selectAva = (avaA: string) => {
    if (avaA == "YouTube") {
      return blackB;
    } else if (avaA == "Twitch") {
      return blackB;
    } else if (avaA == "Kick") {
      return blackB;
    }
  };

  const selectStyle = (styleT: string) => {
    if (styleT == "YouTube") {
      return "redText";
    } else if (styleT == "Twitch") {
      return "greenText";
    } else if (styleT == "Kick") {
      return "purpleText";
    } else {
      return "blueText";
    }
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

        <Drawer
          anchor="bottom"
          open={panelPosition !== "closed"}
          onClose={() => setPanelPosition("closed")}
          sx={{
            "& .MuiDrawer-paper": {
              height: currentHeight,
              transition:
                panelPosition === "half" || panelPosition === "full"
                  ? "height 0.3s ease"
                  : "none",
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
              onTouchStart={handleStickTouchStart}
              onTouchMove={handleStickTouchMove}
              onTouchEnd={handleStickTouchEnd}
            >
              <div className={styles.stick}></div>
            </Box>
            <Box sx={{ flex: 1, padding: 1 }}>
              <div className={styles.chatHeaderBlock}>
                <div className={styles.chatHeaderBlock1}>
                  <span className={styles.chatHeaderBlock1}>Чат</span>
                  <div className={styles.miniChatHeaderBlock1}>
                    <img src={userI} alt="$" />
                    <span className={styles.chat_viewers}>{viewers}</span>
                  </div>
                </div>
                <div className={styles.chatHeaderBlock2}>
                  <img src={settings} alt="" />
                  <img src={close} alt="" />
                </div>
              </div>
              <div className={styles.mainChat}>
                <div className={styles.mainChatButton}>
                  <span className={styles.mainChatButtonText}>
                    Показать чат предыдущего стрима
                  </span>
                </div>
                <div className={styles.messageListBox}>
                  {arr.map((item) => {
                    return (
                      <div className={styles.messageText}>
                        <Avatar size={18} isLive={false} url={selectAva(item.type)} />
                        <span className={styles[selectStyle(item.type)]}>{item.name + ":"}</span>
                        <span className={styles.messageT}>{item.message}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
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
        </Drawer>
      </div>
    </>
  );
};

export default ViewOnline;
