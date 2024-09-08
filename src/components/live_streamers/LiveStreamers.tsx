import { useState, useEffect } from "react";
import reply from "./image/reply.svg";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";
import { tg } from "../../App";
interface Video {
  video_id: string;
  streamer_id: number;
  streamer_name: string;
  viewers: number;
  thumbnail: string;
  author: string;
  link: string;
  platform: string;
  is_subscribed: boolean;
  subscriptions_count: number;
}

interface StreamingPlatforms {
  youtube: Video[];
  twitch: Video[];
  kick: Video[];
}

const LiveStreamers = () => {
  // const init = tg.initData;
  const [search, setSearch] = useState<string>("");
  const [listStreamer, setListStreamers] = useState<StreamingPlatforms | null>(
    null
  );
  const [filteredStreamers, setFilteredStreamers] =
    useState<StreamingPlatforms | null>(null);

  useEffect(() => {
    getListOfLiveStreamers();
  }, []);

  useEffect(() => {
    if (listStreamer) {
      filterStreamersBySearch();
    }
  }, [search, listStreamer]);

  const getListOfLiveStreamers = async () => {
    try {
      const response = await fetch(
        "https://api.bigstreamerbot.io/live-streams/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID": "235519518",
            Auth: "M1bCSx92W6",
          },
        }
      );

      const res = await response.json();
      console.log(res);
      setListStreamers(res);
      setFilteredStreamers(res);
    } catch (err) {
      console.log(err);
    }
  };

  const filterStreamersBySearch = () => {
    if (!listStreamer) return;

    const filteredYouTube = listStreamer.youtube.filter((item) =>
      item.streamer_name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredTwitch = listStreamer.twitch.filter((item) =>
      item.streamer_name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredKick = listStreamer.kick.filter((item) =>
      item.streamer_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStreamers({
      youtube: filteredYouTube,
      twitch: filteredTwitch,
      kick: filteredKick,
    });
  };

  return (
    <div className={style.LiveStreamers}>
      <div className={style.searchContainer}>
        <img src={searchIcon} alt="#" />
        <input
          type="text"
          className={style.searchInput}
          placeholder="Поиск"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      <div className={style.StreamersListHeader}>
        <span>Стримеры</span>
        <img src={reply} alt="#" />
      </div>

      {filteredStreamers?.youtube.map((item) => {
        return (
          <LiveStreamerItem
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={item.thumbnail}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            youtubeOnline={item.viewers}
          />
        );
      })}
      {filteredStreamers?.twitch.map((item) => {
        return (
          <LiveStreamerItem
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={item.thumbnail}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            twitchOnline={item.viewers}
          />
        );
      })}
      {filteredStreamers?.kick.map((item) => {
        return (
          <LiveStreamerItem
            streamer_id={item.streamer_id}
            is_subscribed={item.is_subscribed}
            imgUrl={item.thumbnail}
            name={item.streamer_name}
            subscriptions_count={item.subscriptions_count}
            kickOnline={item.viewers}
          />
        );
      })}
    </div>
  );
};

export default LiveStreamers;
