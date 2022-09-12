import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tracks from "../../components/AudioPlayer/tracks";
const initialState = {
  trackIndex: 0,
  trackingProgress: 0,
  trackList: tracks,
  isPlaying: "",
  isShuffle: false,
  isRepeat: false,
  isMute: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  isSeeking: false,
  isBuffering: false,
  isLoaded: false,
  isPlayingNext: false,
  isPlayingPrev: false,
  displayTime: "00:00:00",
};

export const fetchTracks = createAsyncThunk("audio/fetchTracks", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums/1/photos",
  );
  return response.json();
});
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.trackList = [];
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.trackList = action.payload;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.trackList = [];
      });
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
