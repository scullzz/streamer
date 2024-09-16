
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

interface StreamingPlatforms {
  youtube: Video[];
  twitch: Video[];
  kick: Video[];
}

interface StreamersState {
  listStreamer: StreamingPlatforms | null;
  allStreamers: IStreamer[];
  filteredStreamers: StreamingPlatforms | null;
  inactiveStreamers: IStreamer[];
  loading: boolean;
  error: string | null;
}

const initialState: StreamersState = {
  listStreamer: null,
  allStreamers: [],
  filteredStreamers: null,
  inactiveStreamers: [],
  loading: false,
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

// Async thunk for fetching all streamers
export const fetchAllStreamers = createAsyncThunk(
  "liveStreamers/fetchAllStreamers",
  async () => {
    const response = await fetch("https://api.bigstreamerbot.io/streamers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Telegram-User-ID": "235519518",
        Auth: "M1bCSx92W6",
      },
    });
    const data: IStreamer[] = await response.json();
    return data;
  }
);

const liveStreamersSlice = createSlice({
  name: "liveStreamers",
  initialState,
  reducers: {
    setFilteredStreamers: (state, action) => {
      state.filteredStreamers = action.payload;
    },
    findInactiveStreamers: (state) => {
      if (!state.listStreamer || state.allStreamers.length === 0) return;

      const activeStreamers = [
        ...state.listStreamer.youtube.map((item) => item.streamer_name),
        ...state.listStreamer.twitch.map((item) => item.streamer_name),
        ...state.listStreamer.kick.map((item) => item.streamer_name),
      ];

      state.inactiveStreamers = state.allStreamers.filter(
        (streamer) => !activeStreamers.includes(streamer.name)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListOfLiveStreamers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListOfLiveStreamers.fulfilled, (state, action) => {
        state.loading = false;
        state.listStreamer = action.payload;
        state.filteredStreamers = action.payload;
      })
      .addCase(fetchListOfLiveStreamers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch live streamers";
      })
      .addCase(fetchAllStreamers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStreamers.fulfilled, (state, action) => {
        state.loading = false;
        state.allStreamers = action.payload;
      })
      .addCase(fetchAllStreamers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch all streamers";
      });
  },
});

export const { setFilteredStreamers, findInactiveStreamers } =
  liveStreamersSlice.actions;
export default liveStreamersSlice.reducer;
