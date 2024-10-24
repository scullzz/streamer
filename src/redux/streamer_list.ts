import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { tg } from "../App";
export interface Video {
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
  image: string;
}

interface IStreamer {
  id: number;
  name: string;
  count_sub: number;
  image: string;
  is_subscribed: boolean;
}

interface OverallStreamer extends IStreamer {
  youtube: Video[];
  twitch: Video[];
  kick: Video[];
}

export interface StreamingPlatforms {
  streamers: OverallStreamer[];
  rest: IStreamer[];
}

interface StreamersState {
  platforms: StreamingPlatforms | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StreamersState = {
  platforms: null,
  status: "idle",
  error: null,
};

export const fetchListOfLiveStreamers = createAsyncThunk(
  "liveStreamers/fetchListOfLiveStreamers",
  async () => {
    const response = await fetch("https://api.bigstreamerbot.io/streams/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Telegram-User-ID":
          tg.initDataUnsafe.user?.id !== undefined
            ? tg.initDataUnsafe.user.id.toString()
            : "error",
        Auth: tg.initData,
      },
    });
    const data: StreamingPlatforms = await response.json();
    return data;
  }
);
const updateSubscriptionStatus = (
  platforms: StreamingPlatforms,
  streamerId: number,
  isSubscribed: boolean
) => {
  const platformNames: Array<keyof Omit<OverallStreamer, keyof IStreamer>> = [
    "youtube",
    "twitch",
    "kick",
  ];

  platforms.streamers.forEach((overallStreamer) => {
    platformNames.forEach((platform) => {
      const videos = overallStreamer[platform];
      if (Array.isArray(videos)) {
        videos.forEach((video) => {
          if (video.streamer_id === streamerId) {
            video.is_subscribed = isSubscribed;
            video.subscriptions_count += isSubscribed ? 1 : -1;
          }
        });
      }
    });
  });

  platforms.rest.forEach((streamer) => {
    if (streamer.id === streamerId && isSubscribed === true) {
      streamer.is_subscribed = isSubscribed;
      streamer.count_sub++;
    } else if (streamer.id === streamerId && isSubscribed === false) {
      streamer.is_subscribed = isSubscribed;
      streamer.count_sub--;
    }
  });
};

const liveStreamersSlice = createSlice({
  name: "liveStreamers",
  initialState,
  reducers: {
    subscribeToStreamer: (state, action: PayloadAction<number>) => {
      if (state.platforms) {
        updateSubscriptionStatus(state.platforms, action.payload, true);
      }
    },
    unsubscribeFromStreamer: (state, action: PayloadAction<number>) => {
      if (state.platforms) {
        updateSubscriptionStatus(state.platforms, action.payload, false);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListOfLiveStreamers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchListOfLiveStreamers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.platforms = action.payload;
      })
      .addCase(fetchListOfLiveStreamers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch live streamers";
      });
  },
});

export const { subscribeToStreamer, unsubscribeFromStreamer } =
  liveStreamersSlice.actions;

export default liveStreamersSlice.reducer;
