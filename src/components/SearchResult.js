import React from "react";
import { BsEmojiSunglasses, BsMusicNoteList } from "react-icons/bs";
import { useSelector } from "react-redux";
const SearchResult = () => {
  const { searchResult } = useSelector((state) => state.playList);
  const { artists, tracks } = searchResult || {};
  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md-6">
          <BsEmojiSunglasses /> Available Artists: {artists.hits.length}
        </div>
        <div className="col-12 col-md-6">
          <BsMusicNoteList /> Available Tracks: {tracks.hits.length}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
