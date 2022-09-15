import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlaylistCollection from "../components/PlaylistCollection";
import SinglePlayList from "../components/SinglePlayList";

const PlayListItem = () => {
  const { item } = useParams();
  const {
    localPlaylist,
  } = useSelector((state) => state.playList);
  return (
    <>
      {item && <PlaylistCollection />}
      <h2 className="text-center text-primary text-uppercase mt-2">{item}</h2>
      {localPlaylist?.length > 0 ? (
        <>{<SinglePlayList />}</>
      ) : (
        <h5 className="text-center text-secondary">No song found, Please search something...</h5>
      )}
    </>
  );
};

export default PlayListItem;
