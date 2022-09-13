import axiosIns from "../../utils/axiosIns";

const allFetchTracks = async() => {
    const response = await axiosIns.get(
        "/songs/list-recommendations?key=484129036&locale=en-US",
      );
      return response.data;
}
export default allFetchTracks;