import React, { useEffect, useState } from "react";
import { BsPlayCircle, BsStar, BsStarFill } from "react-icons/bs";
import styles from "../pages/HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { handleOnClick, singleTrackDetails } from "../features/API/APISlice";
import Spinner from "../utils/Spinner";
import {
  setDisplayTime,
  setDuration,
  setIsPlaying,
  setTrackingProgress,
} from "../features/Audio/AudioPlayerSlice";
import { setLocalStorageItem } from "../features/playList/playListSlice";

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();
  const { key, subtitle, images: { coverart } = {} } = song || {};
  const [onClickKey, setOnClickKey] = useState("");
  const { isLoadingTrack, error, success } = useSelector(
    (state) => state.APISlice,
  );
  const { localStorageItem } = useSelector((state) => state.playList);
  const handlePlaySong = (key) => {
    // previous state reset
    dispatch(setIsPlaying(""));
    dispatch(setDisplayTime("00:00:00"));
    dispatch(setDuration(0));
    dispatch(setTrackingProgress(0));
    setOnClickKey(key);
    dispatch(singleTrackDetails(key));
    dispatch(handleOnClick(true));
  };
  useEffect(() => {
    if (success) setOnClickKey("");
  }, [success]);
  useEffect(() => {
    dispatch(setLocalStorageItem(JSON.parse(localStorage.getItem("favorite"))));
  }, [dispatch]);
  const handleFavorite = (key) => {
    const favorite = localStorage.getItem("favorite");
    if (favorite?.length > 0 && favorite !== null) {
      const favoriteList = JSON.parse(favorite);
      const isExist = favoriteList.find((item) => item.key === key);
      if (isExist) {
        const newList = favoriteList.filter((item) => item.key !== key);
        localStorage.setItem("favorite", JSON.stringify(newList));
      } else {
        const newList = [...favoriteList, song];
        localStorage.setItem("favorite", JSON.stringify(newList));
      }
    } else {
      localStorage.setItem("favorite", JSON.stringify([song]));
    }
    dispatch(setLocalStorageItem(JSON.parse(localStorage.getItem("favorite"))));
  };
  return (
    <div className="col-md-3 col-lg-3 col-12">
      <h5 className="p-2">
        {subtitle}{" "}
        <span style={{ cursor: "pointer" }} onClick={() => handleFavorite(key)}>
          {localStorageItem?.length > 0 &&
          localStorageItem.find((item) => item.key === key) ? (
            <BsStarFill />
          ) : (
            <BsStar />
          )}
        </span>
      </h5>
      <img
        src={coverart}
        className="rounded-circle"
        width={"80px"}
        alt={"title"}
      />
      {isLoadingTrack && onClickKey === key ? (
        <div
          style={{
            position: "relative",
            top: "-67px",
            left: "14px",
            color: "Highlight",
          }}>
          <Spinner />
        </div>
      ) : (
        <>
          <BsPlayCircle
            size={"40px"}
            color={"#8cd9ab"}
            className={styles.playIcon}
            onClick={() => handlePlaySong(key)}
          />
        </>
      )}

      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default SingleSong;
