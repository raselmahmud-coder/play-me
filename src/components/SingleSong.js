import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import img from "../assets/artwork.jpg";
import styles from "../pages/HomePage.module.css";


const SingleSong = ({ song }) => {
    const { subtitle,images:{coverart}} = song||{};
  return (
    <div className="col-md-3 col-lg-3 col-12">
      <h5 className="p-2">{subtitle}</h5>
      <img src={coverart} className="rounded-circle" width={"80px"} alt={"title"} />
      <BsPlayCircle size={"40px"} color={"#8cd9ab"} className={styles.playIcon} />
      {/* <h6 className="p-2 my-2">Duration</h6> */}
    </div>
  );
};

export default SingleSong;
