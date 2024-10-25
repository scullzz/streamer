import style from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import copy from "./image/copy.svg";
import row from "./image/row.svg";
import user from "./image/user.svg";
import admin from "./image/admin.svg";
import subs from "./image/subs.svg";
import refs from "./image/refs.svg";
import ruf from "./image/ruffers.svg";
import mes from "./image/message.svg";
// import edit from "./image/edit.svg";
import draw from "./image/draw.svg";
// import card from "./image/card.svg";
import seven from "./image/seven.svg";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";
import { useEffect, useState } from "react";
import { StreamerResponse } from "../streamer_profile/StreamerProfile";
import { tg } from "../../App";
const StreamerExtraInfo = () => {
  const { id } = useParams();
  const inputValue = `https://t.me/clashofslots_bot?start=refstr_${id}`;
  const [data, setData] = useState<StreamerResponse | null>(null);
  const nav = useNavigate();
  // const backPage = () => {
  //   nav(`/streamer/${id}/${status}`);
  // };

  const moveToMessages = () => {
    nav(`/create-post/${id}`);
  };
  const moveToSubscribers = () => {
    nav(`/streamer/subscribers/${id}`);
  };
  const moveToReferals = () => {
    nav(`/streamer/referrals/${id}`);
  };

  const movetoAdmins = () => {
    nav(`/streamer/admins/${id}`);
  };
  useEffect(() => {
    getStreamerData();
  }, []);

  const getStreamerData = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/streams/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Auth: tg.initData,
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
          },
        }
      );

      const res = await response.json();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const copyToBuffer = async () => {
    await navigator.clipboard.writeText(inputValue);
  };
  const shareWithOthers = async () => {
    tg.openTelegramLink(
      `https://t.me/share/url?url=${inputValue}&text=Подписывайся братишка`
    );
  };
  return (
    <div className={style.back}>
      <div className={style.Stream}>
        <div className="mt" style={{ marginTop: "25px" }}></div>

        <StreamerPreview
          headerStyles={{ marginTop: "15px", lineHeight: "23px" }}
          url={"https://api.bigstreamerbot.io/" + data?.streamer.image}
          name={String(data?.streamer.name)}
          isLive={false}
        />

        <div>
          <p className={style.sub_title}>Реферальная Ссылка</p>
          <div className={style.InputBlock}>
            <input
              value={inputValue}
              readOnly
              className={style.InputBlock_input}
              type="text"
            />
          </div>
          <div className={style.miniFlex}>
            <button
              onClick={() => shareWithOthers()}
              className={style.ResendButton}
            >
              Поделиться
            </button>
            <button
              onClick={() => copyToBuffer()}
              className={style.InputBlock_button}
            >
              <img src={copy} alt="#" />
            </button>
          </div>
          <p className={style.description_text}>
            Поделитесь этой ссылкой с подписчиками, чтобы они, пользуясь ботом,
            видели только ваши реферальные ссылки на онлайн казино.
          </p>

          <div className={style.section}>
            <div className={style.profileItem}>
              <div className={style.item_div}>
                <span className={style.iconProfile}>
                  <img src={user} alt="" />
                </span>
                <span>Профиль аффилeйта</span>
              </div>
              <img src={row} alt="#" />
            </div>
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div onClick={() => movetoAdmins()} className={style.item_div}>
                <span className={style.iconAdmin}>
                  <img src={admin} alt="" />
                </span>
                <span>Администраторы</span>
              </div>
              <div className={style.item_div1}>
                {/* <span className={style.count}>2</span> */}
                <img src={row} alt="#" />
              </div>
            </div>
            <div onClick={() => moveToSubscribers()} className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconSubscribers}>
                  <img src={subs} alt="" />
                </span>
                <span>Подписчики</span>
              </div>
              <div className={style.item_div1}>
                {/* <span className={style.count}>125</span> */}
                <img src={row} alt="#" />
              </div>
            </div>
            <div onClick={() => moveToReferals()} className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconReferrals}>
                  <img src={refs} alt="" />
                </span>
                <span>Рефералы</span>
              </div>
              <div className={style.item_div1}>
                {/* <span className={style.count}>125</span> */}
                <img src={row} alt="#" />
              </div>
            </div>
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconRaffle}>
                  <img src={ruf} alt="" />
                </span>
                <span>Розыгрыши</span>
              </div>
              <img src={row} alt="#" />
            </div>
            <div
              onClick={() => {
                moveToMessages();
              }}
              className={style.item}
            >
              <div className={style.item_div}>
                <span className={style.iconMessages}>
                  <img src={mes} alt="" />
                </span>
                <span>Сообщения</span>
              </div>
              <img src={row} alt="#" />
            </div>
            {/* <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconNews}>
                  <img src={edit} alt="" />
                </span>
                <span>Новости</span>
              </div>
              <img src={row} alt="#" />
            </div> */}
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconSocialLinks}>
                  <img src={draw} alt="" />
                </span>
                <span>Соц. сети и ссылки</span>
              </div>
              <img src={row} alt="#" />
            </div>
            {/* <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconCasinoRating}>
                  <img src={card} alt="" />
                </span>
                <span>Рейтинг казино</span>
              </div>
              <img src={row} alt="#" />
            </div> */}
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconTopWins}>
                  <img src={seven} alt="" />
                </span>
                <span>Топ заносы</span>
              </div>
              <img src={row} alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerExtraInfo;
