import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIns from "../../utils/axiosIns";

const initialState = {
  localStorageItem: [],
  showPopUp: false,
  playlist: [],
  searchSong: "",
  autoComplete: [],
  isLoading: false,
  error: "",
};
export const autoCompleteSearch = createAsyncThunk(
  "playList/autoComplete",
  async (searchSong) => {
    const response = await axiosIns.get("/auto-complete", {
      params: { term: searchSong, locale: "en-US", offset: "0", limit: "10" },
    });
    return await response.data;
  },
);

export const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setShowPopUp: (state, action) => {
      state.showPopUp = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setLocalStorageItem: (state, action) => {
      state.localStorageItem = action.payload;
    },
    setSearchSong: (state, action) => {
      state.searchSong = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(autoCompleteSearch.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(autoCompleteSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.autoComplete = action.payload;
      })
      .addCase(autoCompleteSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { setShowPopUp, setPlaylist, setLocalStorageItem, setSearchSong } =
  playListSlice.actions;
export default playListSlice.reducer;
