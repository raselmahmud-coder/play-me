import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://shazam.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
    "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_HOST}`,
  },
});
export default axiosIns;
