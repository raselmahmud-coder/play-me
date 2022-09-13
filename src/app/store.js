import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "../features/Audio/AudioPlayerSlice";
import APISliceReducer  from "../features/API/APISlice";

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    APISlice: APISliceReducer,
  },
  
});
