import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "../features/Audio/AudioPlayerSlice";
import APISliceReducer  from "../features/API/APISlice";
import playListSlice from "../features/playList/playListSlice";

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    APISlice: APISliceReducer,
    playList: playListSlice,
  },
  
});
