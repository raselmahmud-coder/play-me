import React from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  autoCompleteSearch,
  setLocalPlaylist,
  setSearchSong,
} from "../features/playList/playListSlice";
import Spinner from "../utils/Spinner";

const PlaylistCollection = () => {
  const dispatch = useDispatch();
  const { item } = useParams();
  const {
    searchSong,
    autoComplete: { hints } = {},
    isLoading,
    error,
    localPlaylist,
  } = useSelector((state) => state.playList);
  useEffect(() => {
    if (searchSong) dispatch(autoCompleteSearch(searchSong));
  }, [dispatch, searchSong]);
  useEffect(() => {
   if(item) {dispatch(
      setLocalPlaylist(
        JSON.parse(localStorage.getItem("createPlaylist"))?.[item],
      ),
    );}
  }, [dispatch, item]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    dispatch(setSearchSong(text));
    e.target.search.value = "";
  };

  // {playlist1:["song1","song2","song3"],playlist2:["song1","song2","song3"]} object pattern
  const handleAddSong = (song) => {
    const newPlayList = JSON.parse(localStorage.getItem("createPlaylist"));
    if (newPlayList === null) {
      localStorage.setItem(
        "createPlaylist",
        JSON.stringify({ [item]: [song] }),
      );
    } else {
      if (newPlayList[item]) {
        localStorage.setItem(
          "createPlaylist",
          JSON.stringify({
            ...newPlayList,
            [item]: [...newPlayList[item], song],
          }),
        );
      } else {
        localStorage.setItem(
          "createPlaylist",
          JSON.stringify({ ...newPlayList, [item]: [song] }),
        );
      }
    }
    console.log("first", newPlayList);
    dispatch(
      setLocalPlaylist(
        JSON.parse(localStorage.getItem("createPlaylist"))[item],
      ),
    );
  };
  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }
  if (error) {
    content = <div className="text-center">{error}</div>;
  }
  if (hints?.length === 0 || hints === null) {
    content = <div className="text-center">No Song Found</div>;
  }
  // autocomplete form search
  if (hints?.length > 0 && !isLoading && !error) {
    content = (
      <div className="m-0 p-0">
        {hints?.slice(0, 10)?.map((it, index) => (
          <p key={index} className="m-0 py-1">
            {localPlaylist?.find((i) => i === it.term) ? (
              <span
                style={{
                  padding: "3px 5px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                className="bg-danger">
                Already Added
              </span>
            ) : (
              <span
                onClick={() => handleAddSong(it.term)}
                style={{
                  padding: "3px 5px",
                  borderRadius: "4px",
                  marginRight: "5px",
                  cursor: "pointer",
                  backgroundColor: "hsl(144 50% 70%)",
                }}>
                Add
              </span>
            )}

            {it.term?.length > 15 ? it.term.slice(0, 16) + "..." : it.term}
          </p>
        ))}
      </div>
    );
  }
  return (
    <>
      <Form className="d-flex justify-content-center" onSubmit={handleSubmit}>
        <Form.Group controlId="search">
          <Form.Control
            required
            type="search"
            name="search"
            placeholder="Let's find some song"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {searchSong.length > 0 && (
          <Button
            variant="danger"
            type="button"
            onClick={() => dispatch(setSearchSong(""))}>
            Clear
          </Button>
        )}
      </Form>
      {searchSong && (
        <div
          className="d-flex justify-content-center position-absolute w-75 p-3"
          style={{
            top: "100px",
            backgroundColor: "rgb(116 17 255 / 90%)",
            borderRadius: "15px",
          }}>
          {content}
        </div>
      )}
    </>
  );
};

export default PlaylistCollection;
