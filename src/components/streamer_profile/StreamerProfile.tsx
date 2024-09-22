import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
import reply from "./image/reply.svg";
import next_arrow from "./image/next_arrow.svg";
import dots from "./image/dots.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";
import StreamerVideo from "../streamer_video/StreamerVideo";
import Prize from "../prize/Prize";
import {
  subscribeToStreamer,
  unsubscribeFromStreamer,
} from "../../redux/streamer_list";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface Video {
  video_id: number;
  streamer_id: number;
  streamer_name: string;
  viewers: number;
  thumbnail: string;
  author: string;
  link: string;
  platform: string;
  is_subscribed: boolean;
  subscriptions_count: number;
  title: string;
}
interface Streamer {
  id: number;
  name: string;
  image: string;
  is_subscribed: boolean;
  count_sub: number;
}

export interface StreamerResponse {
  kick: Video[];
  streamer: Streamer;
  twitch: Video[];
  youtube: Video[];
}

interface ISocial {
  id: number;
  icon: string;
  name: string;
}
interface ISocialById {
  id: number;
  streamer: number;
  social: number;
  url: string;
}

const StreamerProfile = () => {
  const { id, status } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<StreamerResponse | null>(null);
  const [sub_status, set_sub_status] = useState<boolean>(Boolean(status));
  const [number_of_sub, set_number_of_sub] = useState<number>();
  const [openSocial, setOpenSocial] = useState(false);
  const [role, setRole] = useState<string>();

  const [allSocials, setAllSocials] = useState<ISocial[]>([]);
  const [allSocialsById, setAllSocialsById] = useState<ISocialById[]>([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const nav = useNavigate();

  const backPage = () => {
    nav("/");
  };

  const getRole = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/streamer-admins/${id}`,
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
      setRole(res.role);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSocials = async () => {
    try {
      const response = await fetch("https://api.bigstreamerbot.io/socials/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Auth: "M1bCSx92W6",
        },
      });
      const res = await response.json();
      setAllSocials(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getSocialsByStreamer = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/streamer-socials/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: "M1bCSx92W6",
          },
        }
      );
      const res = await response.json();
      setAllSocialsById(res);
    } catch (err) {
      console.log(err);
    }
  };

  const moveToSettings = () => {
    if (role === "user") {
      setOpenSocial(!openSocial);
    } else {
      nav(`/streamer-extra-info/${id}/${sub_status}`);
    }
  };
  useEffect(() => {
    getStreamerData();
    getRole();
    getAllSocials();
    getSocialsByStreamer();
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

      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setData(res);
        set_sub_status(Boolean(res?.streamer.is_subscribed));
        set_number_of_sub(res?.streamer.count_sub);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatus = (): boolean => {
    if (
      (data?.kick?.length ?? 0) > 0 ||
      (data?.youtube?.length ?? 0) > 0 ||
      (data?.twitch?.length ?? 0) > 0
    ) {
      return true;
    }
    return false;
  };

  const Subscribe = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/subscriptions/${data?.streamer.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID": "235519518",
            Auth: "M1bCSx92W6",
          },
          body: JSON.stringify({
            is_sub: true,
          }),
        }
      );

      if (
        response.ok &&
        typeof number_of_sub === "number" &&
        number_of_sub > -1 &&
        data
      ) {
        set_sub_status(true);
        set_number_of_sub(number_of_sub + 1);
        dispatch(subscribeToStreamer(data.streamer.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UnSubscribe = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/subscriptions/${data?.streamer.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID": "235519518",
            Auth: "M1bCSx92W6",
          },
          body: JSON.stringify({
            is_sub: false,
            date_unsubscribe: new Date(),
          }),
        }
      );

      if (
        response.ok &&
        typeof number_of_sub === "number" &&
        number_of_sub > -1 &&
        data
      ) {
        set_sub_status(false);
        set_number_of_sub(number_of_sub - 1);
        dispatch(unsubscribeFromStreamer(data.streamer.id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.back}>
      <SectionHeader
        left={<span onClick={() => backPage()}>Назад</span>}
        center={<span>Clash of Slots</span>}
        right={<img src={reply} alt="#" />}
      />
      <div className={style.StreamerProfile}>
        <div className="mt" style={{ marginTop: "25px" }}></div>
        <StreamerPreview
          headerStyles={{ marginTop: "15px", lineHeight: "23px" }}
          url={"https://api.bigstreamerbot.io/" + String(data?.streamer.image)}
          name={String(data?.streamer.name)}
          isLive={checkStatus()}
        />

        <div className={style.streamer_stats}>
          <div className={style.streamer_subs}>
            <span className={style.streamer_number}>{number_of_sub}</span>
            <span className={style.streamer_last_info}>
              Подписчиков
              <img src={next_arrow} alt="#" />
            </span>
          </div>
          <div className={style.streamer_refs}>
            <span className={style.streamer_number}>0</span>
            <span className={style.streamer_last_info}>
              Рефералов
              <img src={next_arrow} alt="#" />
            </span>
          </div>
          <div className={style.container}>
            <div
              onClick={() => {
                moveToSettings();
              }}
              className={style.streamer_more}
            >
              <img src={dots} alt="#" />
              <span className={style.more}>ЕЩЁ</span>
            </div>

            {openSocial && (
              <div className={style.menu}>
                {allSocialsById.map((item) => {
                  return (
                    <div className={style.flex_item}>
                      <a href={item.url}>
                        {
                          allSocials.filter((el) => el.id === item.social)[0]
                            .name
                        }
                      </a>
                      <img 
                      className={style.img_block}
                        src={
                          "https://api.bigstreamerbot.io/" +
                          String(
                            allSocials.filter((el) => el.id === item.social)[0]
                              .icon
                          )
                        }
                        alt=""
                      />
                    </div>
                  );
                })}
                {/* <button className={style.unsubscribeButton}>Отписаться</button> */}
              </div>
            )}
          </div>
        </div>

        {sub_status === false ? (
          <div onClick={() => Subscribe()} className={style.actionButtonSub}>
            <p className={style.sub_text}>Подписаться</p>
          </div>
        ) : (
          <div onClick={() => UnSubscribe()} className={style.actionButtonSub1}>
            <p className={style.sub_a_text}>Отписаться</p>
          </div>
        )}

        {(data?.youtube.length && 0 > 0) ||
        (data?.twitch.length && 0 > 0) ||
        (data?.kick.length && 0 > 0) ? (
          <div className={style.online_streamers}>
            <p className={style.online_stream_title}>Стрим онлайн</p>
            <Slider {...settings}>
              {data?.youtube.map((item) => {
                return (
                  <StreamerVideo
                    image={item.thumbnail}
                    link={item.link}
                    platform={item.platform}
                    title={item.title}
                    viewers={item.viewers}
                  />
                );
              })}
              {data?.twitch.map((item) => {
                return (
                  <StreamerVideo
                    image={item.thumbnail}
                    link={item.link}
                    platform={item.platform}
                    title={item.title}
                    viewers={item.viewers}
                  />
                );
              })}
              {data?.kick.map((item) => {
                return (
                  <StreamerVideo
                    image={item.thumbnail}
                    link={item.link}
                    platform={item.platform}
                    title={item.title}
                    viewers={item.viewers}
                  />
                );
              })}
            </Slider>
          </div>
        ) : null}

        <div className={style.RaffleDiv}>
          <span className={style.RaffleDiv_title}>Розыгрыши</span>
          <span className={style.RaffleDiv_numberOf}>Завершенные (12)</span>
        </div>
        <div>
          <Prize
            title="Розыгрыш 10 000 RUB"
            amountOfParticipants={100}
            amountOfPrize={10}
            description="Розыгрыш на 10к для рефералов казино R7 используй промо COBRIK (100FS) ИЛИ COBRIK200 (200%+100FS): https://cobrik.pro/r7 "
            endTime="2024-09-05"
            isCreator={false}
            isParticipant={false}
            raffleConditions={[
              { isDone: false, title: "заполнить email от VAVADA казино" },
            ]}
            forPreview={false}
          />
        </div>
      </div>
    </div>
  );
};

export default StreamerProfile;
