import React from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  autoCompleteSearch,
  setSearchSong,
} from "../features/playList/playListSlice";
import Spinner from "../utils/Spinner";

const PlaylistCollection = () => {
  const dispatch = useDispatch();
  const { item } = useParams();
  console.log(item);
  const {
    searchSong,
    autoComplete: { hints } = {},
    isLoading,
    error,
  } = useSelector((state) => state.playList);
  useEffect(() => {
    if (searchSong) dispatch(autoCompleteSearch(searchSong));
  }, [dispatch, searchSong]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    dispatch(setSearchSong(text));
  };
  const createPlaylist = JSON.parse(localStorage.getItem("createPlaylist"));
  const handleAddSong = (song) => {
    if (createPlaylist === null || createPlaylist.length === 0) {
      localStorage.setItem("createPlaylist", JSON.stringify([song]));
    } else {
      localStorage.setItem(
        "createPlaylist",
        JSON.stringify([...createPlaylist, song]),
      );
    }
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
  if (hints?.length > 0 && !isLoading && !error) {
    content = (
      <div className="m-0 p-0">
        {hints?.slice(0, 10)?.map((item, index) => (
          <p key={index} className="m-0 py-1">
            {createPlaylist.find((i) => i === item.term) ? (
              <span
                onClick={() => handleAddSong(item.term)}
                style={{
                  padding: "3px 5px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                className="bg-danger">
                Remove
              </span>
            ) : (
              <span
                onClick={() => handleAddSong(item.term)}
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

            {item.term.length > 15 ? item.term.slice(0, 16) + "..." : item.term}
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
      {searchSong && <div className="d-flex justify-content-center">{content}</div>}
    </>
  );
};

export default PlaylistCollection;
