import React from "react";
import { useParams } from "react-router-dom";
import PlaylistCollection from "../components/PlaylistCollection";

const PlayListItem = () => {
  const { item } = useParams();
  return (
    <>
      {item && <PlaylistCollection />}
      {item ? item : "no item"}
    </>
  );
};

export default PlayListItem;
