import { useState, useEffect } from "react";
import reply from "./image/reply.svg";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListOfLiveStreamers,
  fetchAllStreamers,
  findInactiveStreamers,
  setFilteredStreamers,
} from "../../redux/streamer_list";
import { RootState, AppDispatch } from "../../store";

const LiveStreamers = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { listStreamer, filteredStreamers, inactiveStreamers } = useSelector(
    (state: RootState) => state.liveStreamers
  );

  useEffect(() => {
    dispatch(fetchListOfLiveStreamers());
    dispatch(fetchAllStreamers());
  }, [dispatch]);

  useEffect(() => {
    if (listStreamer && filteredStreamers) {
      dispatch(findInactiveStreamers());
    }
  }, [listStreamer, filteredStreamers, dispatch]);

  useEffect(() => {
    filterStreamersBySearch(search);
  }, [search]);

  const filterStreamersBySearch = (search: string) => {
    if (!listStreamer) return;

    if (search.trim() === "") {
      dispatch(setFilteredStreamers(listStreamer));
      return;
    }

    const filteredYouTube = listStreamer.youtube.filter((item) =>
      item.streamer_name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredTwitch = listStreamer.twitch.filter((item) =>
      item.streamer_name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredKick = listStreamer.kick.filter((item) =>
      item.streamer_name.toLowerCase().includes(search.toLowerCase())
    );

    dispatch(
      setFilteredStreamers({
        youtube: filteredYouTube,
        twitch: filteredTwitch,
        kick: filteredKick,
      })
    );
  };

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

        {filteredStreamers?.youtube.map((item) => (
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
        {filteredStreamers?.twitch.map((item) => (
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
        {filteredStreamers?.kick.map((item) => (
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

        {inactiveStreamers.map((item) => (
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
