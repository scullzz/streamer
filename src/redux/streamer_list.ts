import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  image: string;
}

interface IStreamer {
  id: number;
  name: string;
  count_sub: number;
  image: string;
  is_subscribed: boolean;
}

export interface StreamingPlatforms {
  youtube: Video[];
  twitch: Video[];
  kick: Video[];
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
        "Telegram-User-ID": "235519518",
        Auth: "M1bCSx92W6",
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
  (["youtube", "twitch", "kick"] as Array<keyof StreamingPlatforms>).forEach(
    (platform) => {
      platforms[platform].forEach((streamer) => {
        if (
          (streamer as Video).streamer_id === streamerId &&
          isSubscribed === true
        ) {
          (streamer as Video).is_subscribed = isSubscribed;
          (streamer as Video).subscriptions_count++;
        } else if (
          (streamer as Video).streamer_id === streamerId &&
          isSubscribed === false
        ) {
          (streamer as Video).is_subscribed = isSubscribed;
          (streamer as Video).subscriptions_count--;
        }
      });
    }
  );

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

// Exporting the subscribe and unsubscribe actions
export const { subscribeToStreamer, unsubscribeFromStreamer } =
  liveStreamersSlice.actions;

export default liveStreamersSlice.reducer;
