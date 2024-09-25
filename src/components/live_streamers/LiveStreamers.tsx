import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListOfLiveStreamers,
  StreamingPlatforms,
} from "../../redux/streamer_list";
import { AppDispatch, RootState } from "../../store";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";
import reply from "./image/reply.svg";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";

const LiveStreamers = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredPlatforms, setFilteredPlatforms] =
    useState<StreamingPlatforms | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { platforms, status } = useSelector(
    (state: RootState) => state.liveStreamers
  );

  const scrollPositionRef = useRef<number>(0); // Для хранения позиции прокрутки

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!platforms) {
      dispatch(fetchListOfLiveStreamers());
    } else {
      setFilteredPlatforms(platforms);
    }
  }, [dispatch, platforms]);

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
        const filteredYoutube = platforms.youtube.filter((item) =>
          item.streamer_name.toLowerCase().includes(search.toLowerCase())
        );
        const filteredTwitch = platforms.twitch.filter((item) =>
          item.streamer_name.toLowerCase().includes(search.toLowerCase())
        );
        const filteredKick = platforms.kick.filter((item) =>
          item.streamer_name.toLowerCase().includes(search.toLowerCase())
        );
        const filteredRest = platforms.rest.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPlatforms({
          youtube: filteredYoutube,
          twitch: filteredTwitch,
          kick: filteredKick,
          rest: filteredRest,
        });
      }
    }
  }, [platforms, search]);

  const handleNavigate = (id: any, is_subscribed: any) => {
    scrollPositionRef.current = window.scrollY; // Сохраняем текущее положение скролла
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
          <span>Стримеры</span>
          <img src={reply} alt="Reply" />
        </div>

        {filteredPlatforms?.youtube.map((item) => (
          <LiveStreamerItem
            key={item.streamer_id}
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={"https://api.bigstreamerbot.io/" + item.image}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            youtubeOnline={item.viewers}
            scrollHandle={() =>
              handleNavigate(item.streamer_id, item.is_subscribed)
            }
          />
        ))}
        {filteredPlatforms?.twitch.map((item) => (
          <LiveStreamerItem
            key={item.streamer_id}
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={"https://api.bigstreamerbot.io/" + item.image}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            twitchOnline={item.viewers}
            scrollHandle={() =>
              handleNavigate(item.streamer_id, item.is_subscribed)
            }
          />
        ))}
        {filteredPlatforms?.kick.map((item) => (
          <LiveStreamerItem
            key={item.streamer_id}
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={"https://api.bigstreamerbot.io/" + item.image}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            kickOnline={item.viewers}
            scrollHandle={() =>
              handleNavigate(item.streamer_id, item.is_subscribed)
            }
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
      </div>
    </div>
  );
};

export default LiveStreamers;
