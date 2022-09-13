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
  error: "",
};

export const fetchTracks = createAsyncThunk("audio/fetchTracks", async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5350642341msh795a42b4d1f7467p194d25jsnd346031e1cb7",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    const response = await fetch(
      "https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US",
      options,
    );
    return response.json();
  } catch (err) {
    console.error(err);
  }
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
        state.error = "";
        state.isLoaded = true;
        state.trackList = [];
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.trackList = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message;
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
