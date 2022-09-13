import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackIndex: 0,
  trackingProgress: 0,
  trackList: [],
  singleTrack: {},
  isPlaying: "",
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  isLoaded: false,
  displayTime: "00:00:00",
};

export const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setTrackIndex: (state, action) => {
      state.trackIndex = action.payload;
    },
    setTrackingProgress: (state, action) => {
      state.trackingProgress = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setDisplayTime: (state, action) => {
      state.displayTime = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    handleNextTrack: (state) => {
      if (state.trackIndex < state.trackList.length - 1) {
        state.trackIndex += 1;
      } else {
        state.trackIndex = 0;
      }
    },
    handlePrevTrack: (state) => {
      if (state.trackIndex > 0) {
        state.trackIndex -= 1;
      } else {
        state.trackIndex = state.trackList.length - 1;
      }
    },
  },
});
export const {
  setTrackIndex,
  setTrackingProgress,
  setDisplayTime,
  setIsPlaying,
  setVolume,
  handleNextTrack,
  handlePrevTrack,
  setDuration,
} = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
