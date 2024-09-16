import { configureStore } from "@reduxjs/toolkit";
import liveStreamersReducer from "./redux/streamer_list";

const store = configureStore({
  reducer: {
    liveStreamers: liveStreamersReducer,
  },
});

// Define types for use with dispatch and selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
