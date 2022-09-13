import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const APISlice = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5350642341msh795a42b4d1f7467p194d25jsnd346031e1cb7",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  }),
  tagTypes: ["songs"],
  endpoints: (build) => ({
    getPlayList: build.query({
      query: () => ({
        url: `/list-recommendations?key=484129036&locale=en-US`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "5350642341msh795a42b4d1f7467p194d25jsnd346031e1cb7",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      }),
      providesTags: () => [{ type: "Post" }],
    }),
  }),
});
export const { useGetPlayListQuery } = APISlice;
