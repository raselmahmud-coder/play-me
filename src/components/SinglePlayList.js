import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLocalPlaylist } from "../features/playList/playListSlice";

const SinglePlayList = () => {
  const { item } = useParams();
  const dispatch = useDispatch();
const {localPlaylist}= useSelector((state) => state.playList)

  const handleRemoveSong = (song) => {
    const newPlayList = JSON.parse(localStorage.getItem("createPlaylist"));
    const newSongList = newPlayList[item].filter((it) => it !== song);
    localStorage.setItem(
      "createPlaylist",
      JSON.stringify({ ...newPlayList, [item]: newSongList }),
    );
    dispatch(
      setLocalPlaylist(
        JSON.parse(localStorage.getItem("createPlaylist"))?.[item],
      ),
    );
  };

  return (
    <div className="row">
      <div className="my-2 p-1">
        <ol className="d-flex flex-column">
          {localPlaylist?.map((item, index) => (
            <li key={index} className="text-capitalize">
              {item}{" "}
              <small
                style={{ backgroundColor: "tomato", cursor: "pointer" }}
                className="py-1 px-2 rounded text-white"
                onClick={() => handleRemoveSong(item)}>
                Remove
              </small>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SinglePlayList;
