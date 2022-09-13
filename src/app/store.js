import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "../features/Audio/AudioPlayerSlice";
import { APISlice } from "../features/API/APISlice";

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    [APISlice.reducerPath]: APISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APISlice.middleware),
});
