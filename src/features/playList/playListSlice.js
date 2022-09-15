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
  localPlaylist: [],
  searchResult: {},
  searchLoading: false,
  searchError: "",
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
export const Search = createAsyncThunk(
  "song/search",
  async (search) => {
    const response = await axiosIns.get("/search", {
      params: { term: search, locale: "en-US", offset: "0", limit: "10" },
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
    setLocalPlaylist: (state, action) => {
      state.localPlaylist = action.payload;
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
      })
      // for search feature
      .addCase(Search.pending, (state) => {
        state.searchLoading = true;
        state.searchError = "";
      })
      .addCase(Search.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(Search.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message;
      });
  },
});
export const {
  setShowPopUp,
  setPlaylist,
  setLocalStorageItem,
  setSearchSong,
  setLocalPlaylist,
} = playListSlice.actions;
export default playListSlice.reducer;
