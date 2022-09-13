import axiosIns from "../../utils/axiosIns";

const getTrackDetails = async (key) => {
  const response = await axiosIns.get("/songs/get-details", {
    params: { key, locale: "en-US" },
  });
  console.log(response.data);
  return response.data;
};
export default getTrackDetails;
