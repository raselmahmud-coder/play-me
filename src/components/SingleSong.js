import React, { useEffect, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import styles from "../pages/HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { singleTrackDetails } from "../features/API/APISlice";
import Spinner from "../utils/Spinner";

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();
  const {
    key,
    subtitle,
    images: { coverart },
  } = song || {};
  const [onClickKey, setOnClickKey] = useState("");
  const { isLoadingTrack, error, success } = useSelector(
    (state) => state.APISlice,
  );
  const handlePlaySong = (key) => {
    setOnClickKey(key);
    dispatch(singleTrackDetails(key));
  };
  useEffect(() => {
    if (success) setOnClickKey("");
  }, [success]);
  return (
    <div className="col-md-3 col-lg-3 col-12">
      <h5 className="p-2">{subtitle}</h5>
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
