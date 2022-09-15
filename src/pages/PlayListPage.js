import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../features/playList/playListSlice";
import { setShowPopUp } from "../features/playList/playListSlice";
import PopUp from "../utils/PopUp";
import { NavLink, Outlet } from "react-router-dom";
const PlayListPage = () => {
  const dispatch = useDispatch();
  const { showPopUp, playlist } = useSelector((state) => state.playList);
  useEffect(() => {
    return () => {
      dispatch(setPlaylist(JSON.parse(localStorage.getItem("playlist"))));
    };
  }, [dispatch]);
  const handleShow = () => dispatch(setShowPopUp(true));
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <Button className="" onClick={handleShow}>
            Create Playlist
          </Button>
        </div>
        <div className="col-md-9">
          {playlist?.length > 0 ? (
            <nav>
              <div className="container-fluid">
                <ul className="navbar-nav">
                  <div className="d-flex">
                    {playlist?.map((item, index) => (
                      <li key={index} className="nav-item">
                        <NavLink
                          className={`nav-link text-capitalize`}
                          style={{ color: "black", padding: "8px 10px" }}
                          to={`/playlist/${item}`}>
                          {item}
                        </NavLink>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </nav>
          ) : (
            <div>No Playlist</div>
          )}
        </div>
      </div>
      <div className="row mt-3 mb-1">
        <Outlet />
      </div>

      {showPopUp && <PopUp />}
    </>
  );
};

export default PlayListPage;
