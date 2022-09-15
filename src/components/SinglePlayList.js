import React from "react";
import { useParams } from "react-router-dom";

const SinglePlayList = () => {
  const { item } = useParams();
  const createPlaylist = JSON.parse(localStorage.getItem("createPlaylist"));
  //   console.log(createPlaylist?.[item]);
  //   console.log("createPlaylist?.[item]");
  return (
    <div className="row">
      <div className="my-2 p-1">
        
        <ol className="d-flex flex-column">
          {createPlaylist?.[item]?.map((item, index) => (
            <li key={index} className="text-capitalize">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SinglePlayList;
