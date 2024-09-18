import { useState, useEffect } from "react";
import reply from "./image/reply.svg";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListOfLiveStreamers,
  StreamingPlatforms,
} from "../../redux/streamer_list";
import { AppDispatch, RootState } from "../../store";

const LiveStreamers = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredPlatforms, setFilteredPlatforms] =
    useState<StreamingPlatforms | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { platforms, status } = useSelector(
    (state: RootState) => state.liveStreamers
  );

  useEffect(() => {
    if (!platforms) {
      dispatch(fetchListOfLiveStreamers());
      console.log(platforms);
    } else {
      setFilteredPlatforms(platforms);
    }
  }, [dispatch, platforms]);

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
            imgUrl={item.thumbnail}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            youtubeOnline={item.viewers}
          />
        ))}
        {filteredPlatforms?.twitch.map((item) => (
          <LiveStreamerItem
            key={item.streamer_id}
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={item.thumbnail}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            twitchOnline={item.viewers}
          />
        ))}
        {filteredPlatforms?.kick.map((item) => (
          <LiveStreamerItem
            key={item.streamer_id}
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={item.thumbnail}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            kickOnline={item.viewers}
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
          />
        ))}
      </div>
    </div>
  );
};

export default LiveStreamers;
