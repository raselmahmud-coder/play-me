import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import allFetchTracks from "./fetchTracks";
import getTrackDetails from "./getTrackDetails";
import tracks from "../../components/AudioPlayer/tracks";
const initialState = {
  trackList: [],
  singleTrack: {},
  isLoadingTracks: false,
  isLoadingTrack: false,
  success: false,
  error: "",
};

export const fetchTracks = createAsyncThunk("audio/fetchTracks", async () => {
  try {
    return await allFetchTracks();
  } catch (err) {
    console.error(err);
  }
});
export const singleTrackDetails = createAsyncThunk(
  "audio/singleTrackDetails",
  async (key) => {
    try {
      return await getTrackDetails(key);
    } catch (err) {
      console.error(err);
    }
  },
);
export const APISlice = createSlice({
  name: "api",
  initialState,
  extraReducers: (builder) => {
    builder
      // fetchTracks for all tracks
      .addCase(fetchTracks.pending, (state) => {
        state.error = "";
        state.isLoadingTracks = true;
        state.trackList = [];
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.isLoadingTracks = false;
        state.trackList = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.isLoadingTracks = false;
        state.error = action.error.message;
        state.trackList = [];
      })
      // fot details track
      .addCase(singleTrackDetails.pending, (state) => {
        state.success = false;
        state.error = "";
        state.isLoadingTrack = true;
        state.singleTrack = {};
      })
      .addCase(singleTrackDetails.fulfilled, (state, action) => {
        state.isLoadingTrack = false;
        state.success = true;
        state.singleTrack = action.payload;
      })
      .addCase(singleTrackDetails.rejected, (state, action) => {
        state.isLoadingTrack = false;
        state.error = action.error.message;
        state.singleTrack = {};
      });
  },
});

export default APISlice.reducer;
