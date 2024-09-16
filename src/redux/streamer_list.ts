import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    const data: StreamingPlatforms = await response.json();
    return data;
  }
);

const liveStreamersSlice = createSlice({
  name: "liveStreamers",
  initialState,
  reducers: {},
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

export default liveStreamersSlice.reducer;
