import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://shazam.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "11107f7c72msh8d36b518354aaf0p133a37jsn7fd405c3ceb1",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
});
export default axiosIns;
