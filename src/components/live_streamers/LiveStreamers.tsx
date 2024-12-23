import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListOfLiveStreamers,
  StreamingPlatforms,
} from "../../redux/streamer_list";
import { AppDispatch, RootState } from "../../store";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";
import { tg } from "../../App";

const LiveStreamers = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredPlatforms, setFilteredPlatforms] =
    useState<StreamingPlatforms | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { platforms, status } = useSelector(
    (state: RootState) => state.liveStreamers
  );

  useEffect(() => {
    tg.setHeaderColor("#131313");
    tg.setBackgroundColor("#131313");
  }, []);

  const scrollPositionRef = useRef<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchListOfLiveStreamers());
  }, [dispatch, location]);

  const [stableHeight, setStableHeight] = useState(0);

  useEffect(() => {
    const handleViewportChange = () => {
      if (tg.viewportStableHeight > 0) {
        setStableHeight(tg.viewportStableHeight);
      }
    };

    tg.onEvent("viewportChanged", handleViewportChange);

    return () => {
      tg.offEvent("viewportChanged", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (stableHeight > 0) {
      dispatch(fetchListOfLiveStreamers());
    }
  }, [stableHeight]);

  useEffect(() => {
    if (platforms) {
      setFilteredPlatforms(platforms);
    }
  }, [platforms]);

  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  }, []);

  useEffect(() => {
    if (platforms) {
      if (search === "") {
        setFilteredPlatforms(platforms);
      } else {
        const filteredStream = platforms.streamers.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );

        const filteredRest = platforms.rest.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredPlatforms({
          streamers: filteredStream,
          rest: filteredRest,
        });
      }
    }
  }, [platforms, search]);

  const handleNavigate = (id: any, is_subscribed: any) => {
    scrollPositionRef.current = window.scrollY;
    localStorage.setItem("scrollPosition", String(scrollPositionRef.current));
    navigate(`/streamer/${id}/${is_subscribed}`);
  };

  if (status === "loading") {
    return (
      <div className={style.loader_container}>
        <div className={style.loader}></div>
      </div>
    );
  }

  return (
    <div className={style.back}>
      <div className={style.LiveStreamers}>
        <div className={style.searchContainer}>
          <img src={searchIcon} alt="Search" />
          <input
            type="text"
            className={style.searchInput}
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>

        <div className={style.StreamersListHeader}>
          <span className={style.StreamerText}>Стримеры</span>
        </div>

        {filteredPlatforms?.streamers.map((item) => (
          <LiveStreamerItem
            key={item.id}
            streamer_id={item.id}
            is_subscribed={item.is_subscribed}
            imgUrl={"https://api.bigstreamerbot.io/" + item.image}
            name={item.name}
            subscriptions_count={item.count_sub}
            youtubeOnline={item.youtube}
            twitchOnline={item.twitch}
            kickOnline={item.kick}
            scrollHandle={() => handleNavigate(item.id, item.is_subscribed)}
          />
        ))}

        {filteredPlatforms?.rest.map((item) => (
          <LiveStreamerItem
            key={item.id}
            streamer_id={item.id}
            is_subscribed={item.is_subscribed}
            imgUrl={"https://api.bigstreamerbot.io/" + item.image}
            name={item.name}
            subscriptions_count={item.count_sub}
            scrollHandle={() => handleNavigate(item.id, item.is_subscribed)}
          />
        ))}

        {/* <div className={style.endBlock}>
          <span className={style.v_text}>
            <span className={style.line1}>
              Стримеры и модераторы стримеров - обращайтесь к
            </span>
            <br />
            <span className={style.line2}>
              @SupportBot для получения доступов к полному
            </span>
            <br />
            <span className={style.line4}>функционалу бота</span>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default LiveStreamers;
