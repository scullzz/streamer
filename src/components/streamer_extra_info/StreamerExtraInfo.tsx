import style from "./style.module.css";
import { SectionHeader } from "../section_header/SectionHeader";
import { useNavigate, useParams } from "react-router-dom";
import copy from "./image/copy.svg";
import row from "./image/row.svg";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";
import { useEffect, useState } from "react";
import { StreamerResponse } from "../streamer_profile/StreamerProfile";
const StreamerExtraInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState<StreamerResponse | null>(null);
  const nav = useNavigate();
  const backPage = () => {
    nav(`/streamer/${id}`);
  };

  const moveToMessages = () => {
    nav(`/create-post/${id}`);
  };

  useEffect(() => {
    getStreamerData();
  }, []);

  const getStreamerData = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/live-streams/stream/?pk=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Auth: "M1bCSx92W6",
            "Telegram-User-ID": "235519518",
          },
        }
      );

      const res = await response.json();
      console.log(res);
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.back}>
      <SectionHeader
        left={<span onClick={() => backPage()}>Назад</span>}
        center={<span>Clash of Slots</span>}
      />

      <div className={style.Stream}>
        <div className="mt" style={{ marginTop: "25px" }}></div>

        <StreamerPreview
          headerStyles={{ marginTop: "15px", lineHeight: "23px" }}
          url={"https://api.bigstreamerbot.io" + data?.streamer.image}
          name={String(data?.streamer.name)}
          isLive={false}
        />

        <div>
          <p className={style.sub_title}>Реферальная Ссылка</p>
          <div className={style.InputBlock}>
            <input
              value={"https://t.me/clashofslotsbot/cobrik?promo=895b729e-d5dd"}
              readOnly
              className={style.InputBlock_input}
              type="text"
            />
            <button className={style.InputBlock_button}>
              <img src={copy} alt="#" />
            </button>
          </div>
          <button className={style.ResendButton}>Поделиться</button>
          <p className={style.description_text}>
            Поделитесь этой ссылкой с подписчиками, чтобы они, пользуясь ботом,
            видели только ваши реферальные ссылки на онлайн казино.
          </p>

          <div className={style.section}>
            <div className={style.profileItem}>
              <div className={style.item_div}>
                <span className={style.iconProfile}></span>
                <span>Профиль аффилeйта</span>
              </div>
              <img src={row} alt="#" />
            </div>
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconAdmin}></span>
                <span>Администраторы</span>
              </div>
              <div className={style.item_div1}>
                {/* <span className={style.count}>2</span> */}
                <img src={row} alt="#" />
              </div>
            </div>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconSubscribers}></span>
                <span>Подписчики</span>
              </div>
              <div className={style.item_div1}>
                {/* <span className={style.count}>125</span> */}
                <img src={row} alt="#" />
              </div>
            </div>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconReferrals}></span>
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
                <span className={style.iconRaffle}></span>
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
                <span className={style.iconMessages}></span>
                <span>Сообщения</span>
              </div>
              <img src={row} alt="#" />
            </div>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconNews}></span>
                <span>Новости</span>
              </div>
              <img src={row} alt="#" />
            </div>
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconSocialLinks}></span>
                <span>Соц. сети и ссылки</span>
              </div>
              <img src={row} alt="#" />
            </div>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconCasinoRating}></span>
                <span>Рейтинг казино</span>
              </div>
              <img src={row} alt="#" />
            </div>
          </div>

          <div className={style.section}>
            <div className={style.item}>
              <div className={style.item_div}>
                <span className={style.iconTopWins}></span>
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
