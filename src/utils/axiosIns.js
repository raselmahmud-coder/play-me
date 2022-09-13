import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://shazam.p.rapidapi.com",
//   timeout: 3000,
  headers: {
    "X-RapidAPI-Key": "5350642341msh795a42b4d1f7467p194d25jsnd346031e1cb7",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
});
export default axiosIns;
