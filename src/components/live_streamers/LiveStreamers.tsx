import { useState } from "react";
import reply from "./image/reply.svg";
import searchIcon from "./image/search.svg";
import style from "./style.module.css";
import LiveStreamerItem from "../live_streamers_item/LiveStreamerItem";

// interface GetOneActiveStreamer {
//   id: number;
//   tgId: string;
//   imageUrl: string | null;
//   name: string | null;
//   subscribers: number | null;
//   isSubscribed: boolean | null;
//   liveYoutube: number | null;
//   liveTwitch: number | null;
//   liveKick: number | null;
// }

const LiveStreamers = () => {
  const [search, setSearch] = useState<null | string>(null);
  console.log(search);

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

      <LiveStreamerItem
        is_subscribed={true}
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={true}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={true}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
      <LiveStreamerItem
        imgUrl={""}
        name={""}
        subscribers={0}
        youtubeOnline={0}
        twitchOnline={0}
        kickOnline={0}
        is_subscribed={false}
      ></LiveStreamerItem>
    </div>
  );
};

export default LiveStreamers;
