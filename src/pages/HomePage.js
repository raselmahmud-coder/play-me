import React, { useEffect } from "react";
import { useGetPlayListQuery } from "../features/API/APISlice";
import { fetchTracks } from "../features/Audio/AudioPlayerSlice";
import Spinner from "../utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import SingleSong from "../components/SingleSong";
const HomePage = () => {
  /*   const {
    isError,
    isLoading,
    isFetching,
    // data: trackList,
    error,
  } = useGetPlayListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  }); */
  const dispatch = useDispatch();
  const {
    trackList: { tracks },
    isLoaded: isLoading,
    error: isError,
  } = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  console.log(tracks);
  // what to render if the query is loading
  let content;
  if (isLoading)
    content = (
      <div className="text-center">
        <Spinner />
      </div>
    );
  if (isError) content = <div className="text-danger">{isError}</div>;
  if (!isLoading && !isError && tracks?.length > 0) {
    content = (
      <>
        {tracks?.slice(0, 6)?.map((item) => (
          <SingleSong key={item.key} song={item} />
        ))}
      </>
    );
  }
  return (
    <div className="row">
      <h3 className="text-center mb-4 mt-2">
        Your PlayList &amp; Favorites Music
      </h3>
      {content}

      {/* should be audio player here */}
    </div>
  );
};

export default HomePage;
