import { configureStore } from "@reduxjs/toolkit";
import liveStreamersReducer from "./redux/streamer_list";

export const store = configureStore({
  reducer: {
    liveStreamers: liveStreamersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
