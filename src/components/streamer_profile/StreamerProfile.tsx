// import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
// import reply from "./image/reply.svg";
import next_arrow from "./image/next_arrow.svg";
import dots from "./image/dots.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";
import StreamerVideo from "../streamer_video/StreamerVideo";
import Prize from "../prize/Prize";
import link from "./image/link.svg";
import { unsubscribeFromStreamer } from "../../redux/streamer_list";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import exit from "./image/exit.svg";
import none from "./image/none1.gif";
import { tg } from "../../App";
import SubscribeForm from "../(un)subscribe/Subscribe";
import SureModal from "../sure_to_unsub/MakeSure";

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
interface Raffle {
  id: number; // Read-only, автогенерируется
  streamer: number; // Обязательное поле, ID стримера
  conditions: any[]; // Обязательное поле, массив условий (тип не определен, можно уточнить в будущем)
  count_winners: number; // Обязательное поле, количество победителей
  amount: number; // Обязательное поле, сумма
  description: string; // Обязательное поле, описание
  date_end: string; // Обязательное поле, дата завершения (формат ISO)
  see_winners?: boolean; // Необязательное поле, флаг для показа победителей
  date_create?: string;
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

interface ConditionData {
  id: number;
  name: string;
  description: string;
  date_create: string;
  isDone: boolean;
}

const StreamerProfile = () => {
  const { id, status } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<StreamerResponse | null>(null);
  const [sub_status, set_sub_status] = useState<boolean>(
    status === "true" ? true : false
  );
  const [number_of_sub, set_number_of_sub] = useState<number>();
  const [openSocial, setOpenSocial] = useState(false);
  const [role, setRole] = useState<string>();
  const [image, setImage] = useState<string>();
  const [conditions, setConditions] = useState<ConditionData[] | []>([]);

  const [allSocials, setAllSocials] = useState<ISocial[]>([]);
  const [allSocialsById, setAllSocialsById] = useState<ISocialById[]>([]);
  const [raffle, setRaffle] = useState<Raffle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isSubscribeModalOpen, setIsSubscribedModalOpen] =
    useState<boolean>(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const nav = useNavigate();

  const closeModal = () => {
    setIsSubscribedModalOpen(false);
  };
  // const backPage = () => {
  //   nav("/");
  // };

  const getRole = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/streamer-admins/${id}`,
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
          Auth: tg.initData,
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
            Auth: tg.initData,
          },
        }
      );
      const res = await response.json();
      setAllSocialsById(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getSocialLinks = () => {
    setOpenSocial(!openSocial);
  };

  const moveToSettings = () => {
    nav(`/streamer-extra-info/${id}/${sub_status}`);
  };

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

      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setData(res);
        if (res.streamer.image) {
          setImage(res.streamer.image);
        }
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
      if (typeof number_of_sub === "number" && number_of_sub > -1 && data) {
        set_sub_status(true);
        set_number_of_sub(number_of_sub + 1);
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
            "Telegram-User-ID":
              tg.initDataUnsafe.user?.id !== undefined
                ? tg.initDataUnsafe.user.id.toString()
                : "error",
            Auth: tg.initData,
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

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getRaffle = async () => {
    try {
      const response = await fetch(
        `https://api.bigstreamerbot.io/raffles/?pk=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: tg.initData,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setRaffle(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllConditions = async () => {
    try {
      const response = await fetch(
        "https://api.bigstreamerbot.io/conditions/",
        {
          headers: {
            "Content-Type": "application/json",
            Auth: tg.initData,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setConditions(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const moveToSubscriberPage = (id: any) => {
    nav(`/streamer/subscribers/${id}`);
  };

  const moveToReferralPage = (id: any) => {
    nav(`/streamer/referrals/${id}`);
  };

  useEffect(() => {
    getStreamerData(); // Дожидаемся загрузки данных стримера
    getRole(); // Дожидаемся загрузки роли
    getAllSocials(); // Дожидаемся загрузки всех соцсетей
    getSocialsByStreamer(); // Дожидаемся загрузки соцсетей стримера
    getRaffle();
    getAllConditions();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.back}>
      <div className={style.StreamerProfile}>
        <div className="mt" style={{ marginTop: "25px" }}></div>
        <StreamerPreview
          headerStyles={{ marginTop: "15px", lineHeight: "23px" }}
          url={"https://api.bigstreamerbot.io" + image}
          name={String(data?.streamer.name)}
          details="Профиль аффилейта"
          isLive={checkStatus()}
          role={role}
          move={moveToSettings}
          hidden_status={true}
        />

        <div className={style.streamer_stats}>
          <div
            onClick={() => moveToSubscriberPage(data?.streamer.id)}
            className={style.streamer_subs}
          >
            <span className={style.streamer_number}>{number_of_sub}</span>
            <span className={style.streamer_last_info}>
              Подписчиков
              <img src={next_arrow} alt="#" />
            </span>
          </div>
          <div
            onClick={() => moveToReferralPage(data?.streamer.id)}
            className={style.streamer_refs}
          >
            <span className={style.streamer_number}>0</span>
            <span className={style.streamer_last_info}>
              Рефералов
              <img src={next_arrow} alt="#" />
            </span>
          </div>
          <div className={style.container}>
            <div
              onClick={() => {
                getSocialLinks();
              }}
              className={style.streamer_more}
            >
              <div style={{ height: "14px" }}>
                <img src={dots} alt="#" />
              </div>
              <span className={style.more}>Еще</span>
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
                      <img className={style.img_block} src={link} alt="" />
                    </div>
                  );
                })}
                {sub_status === true ? (
                  <div
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className={style.flex_item1}
                  >
                    <span className={style.unsub_text}>Отписаться</span>
                    <img src={exit} alt="#" />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {sub_status === false ? (
          <div
            onClick={() => {
              setIsSubscribedModalOpen(true);
            }}
            className={style.actionButtonSub}
          >
            <p className={style.sub_text}>Подписаться</p>
          </div>
        ) : null}

        {(data?.kick?.length ?? 0) > 0 ||
        (data?.youtube?.length ?? 0) > 0 ||
        (data?.twitch?.length ?? 0) > 0 ? (
          <div className={style.online_streamers}>
            <p className={style.online_stream_title}>Стрим онлайн</p>
            <Slider {...settings}>
              {data?.youtube.map((item) => {
                return (
                  <StreamerVideo
                    name={item.streamer_name}
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
                    name={item.streamer_name}
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
                    name={item.streamer_name}
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
          <span className={style.RaffleDiv_numberOf}>
            Завершенные ({raffle.length})
          </span>
        </div>

        {raffle.length > 0 ? (
          <>
            <div>
              {raffle.map((item) => {
                return (
                  <Prize
                    title="Розыгрыш 10 000 RUB"
                    amountOfParticipants={100}
                    amountOfPrize={item.amount}
                    description={item.description}
                    endTime={item.date_end}
                    isCreator={role === "owner" ? true : false}
                    isParticipant={false}
                    raffleConditions={conditions.filter((f) =>
                      raffle.some((i) => i.conditions.some((c) => c === f.id))
                    )}
                    forPreview={
                      new Date(item.date_end) < new Date() ? true : false
                    }
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className={style.NoneRaffle}>
            <div className={style.NoneDisplayBlock}>
              <img
                style={{ width: "70px", height: "65px" }}
                src={none}
                alt="#"
              />
            </div>
            <div className={style.NoneDisplayBlock1}>
              <p className={style.firstPar}>Нет активных розыгрышей</p>
              <p className={style.secondPar}>
                Подпишитесь на стримера, чтобы получать оповещения о его
                розыгрышах:
              </p>
            </div>
            {sub_status === false ? (
              <div
                onClick={() => {
                  setIsSubscribedModalOpen(true);
                }}
                className={style.actionButtonSub}
              >
                <p className={style.sub_text}>Подписаться</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {isSubscribeModalOpen && (
        <SubscribeForm
          isSubscribed={sub_status}
          onClose={closeModal}
          streamerId={data?.streamer.id ?? 0}
          imgUrl={"https://api.bigstreamerbot.io" + (image ?? "")}
          name={data?.streamer.name ?? ""}
          onCustomSubscribe={Subscribe}
        />
      )}
      <SureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        approve={UnSubscribe}
        id={id}
        name={data?.streamer.name}
      />
    </div>
  );
};

export default StreamerProfile;
