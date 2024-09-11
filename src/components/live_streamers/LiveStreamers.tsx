import { useState, useEffect } from "react";
import reply from "./image/reply.svg";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";
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
}
interface IStreamer {
  id: number;
  name: string;
  count_sub: number;
  image: string;
  is_subscribed: boolean;
}

interface StreamingPlatforms {
  youtube: Video[];
  twitch: Video[];
  kick: Video[];
}

const LiveStreamers = () => {
  const [search, setSearch] = useState<string>("");
  const [listStreamer, setListStreamers] = useState<StreamingPlatforms | null>(
    null
  );
  const [filteredStreamers, setFilteredStreamers] =
    useState<StreamingPlatforms | null>(null);

  const [allStreamers, setAllStreamers] = useState<IStreamer[]>([]);
  const [inactiveStreamers, setInactiveStreamers] = useState<IStreamer[]>([]);

  useEffect(() => {
    getListOfLiveStreamers();
    getAllStreamers();
  }, []);

  useEffect(() => {
    if (listStreamer) {
      findInactiveStreamers();
    }
  }, [listStreamer, allStreamers]);

  useEffect(() => {
    filterStreamersBySearch();
  }, [search]);

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
      setListStreamers(res);
      setFilteredStreamers(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllStreamers = async () => {
    try {
      const response = await fetch("https://api.bigstreamerbot.io/streamers/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Telegram-User-ID": "235519518",
          Auth: "M1bCSx92W6",
        },
      });

      const res: IStreamer[] = await response.json();
      console.log(res);
      setAllStreamers(res);
    } catch (err) {
      console.log(err);
    }
  };

  const findInactiveStreamers = () => {
    if (!listStreamer || !allStreamers) return;

    const activeStreamers = [
      ...listStreamer.youtube.map((item) => item.streamer_name),
      ...listStreamer.twitch.map((item) => item.streamer_name),
      ...listStreamer.kick.map((item) => item.streamer_name),
    ];

    const inactive = allStreamers.filter(
      (streamer) => !activeStreamers.includes(streamer.name)
    );

    setInactiveStreamers(inactive);
  };

  const filterStreamersBySearch = () => {
    if (!listStreamer) return;

    if (search.trim() === "") {
      setFilteredStreamers(listStreamer);
      setInactiveStreamers(
        allStreamers.filter(
          (streamer) =>
            !listStreamer.youtube
              .concat(listStreamer.twitch)
              .concat(listStreamer.kick)
              .some((item) => item.streamer_name === streamer.name)
        )
      );
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

    const filteredInactive = inactiveStreamers.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStreamers({
      youtube: filteredYouTube,
      twitch: filteredTwitch,
      kick: filteredKick,
    });
    setInactiveStreamers(filteredInactive);
  };

  return (
    <div className={style.back}>
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

        {inactiveStreamers.map((item) => {
          return (
            <LiveStreamerItem
              streamer_id={item.id}
              is_subscribed={item.is_subscribed}
              imgUrl={"https://api.bigstreamerbot.io/" + item.image}
              name={item.name}
              subscriptions_count={item.count_sub}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LiveStreamers;
