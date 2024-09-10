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
import { useNavigate } from "react-router-dom";

const StreamerProfile = () => {
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
  const moveToSettings = () => {
    nav("/streamer-extra-info");
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
          url={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s"
          }
          name={"Пользователь"}
          details="Профиль аффилейта"
          isLive={true}
        />

        <div className={style.streamer_stats}>
          <div className={style.streamer_subs}>
            <span className={style.streamer_number}>125</span>
            <span className={style.streamer_last_info}>
              Подписчиков
              <img src={next_arrow} alt="#" />
            </span>
          </div>
          <div className={style.streamer_refs}>
            <span className={style.streamer_number}>512</span>
            <span className={style.streamer_last_info}>
              Рефералов
              <img src={next_arrow} alt="#" />
            </span>
          </div>
          <div
            onClick={() => {
              moveToSettings();
            }}
            className={style.streamer_more}
          >
            <img src={dots} alt="#" />
            <span className={style.more}>ЕЩЁ</span>
          </div>
        </div>

        <div className={style.actionButtonSub}>
          <p className={style.sub_text}>Подписаться</p>
        </div>

        <div className={style.online_streamers}>
          <p className={style.online_stream_title}>Стрим онлайн</p>
          <Slider {...settings}>
            {Array.from({ length: 3 }).map(() => (
              <StreamerVideo />
            ))}
          </Slider>
        </div>

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
