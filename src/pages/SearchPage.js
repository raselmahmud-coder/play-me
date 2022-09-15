import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  autoCompleteSearch,
  Search,
  setSearchSong,
} from "../features/playList/playListSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../utils/Spinner";
import SearchResult from "../components/SearchResult";

const SearchPage = () => {
  const dispatch = useDispatch();
  const {
    searchSong,
    autoComplete: { hints } = {},
    isLoading,
    error,
    searchLoading,
    searchError,
    searchResult,
  } = useSelector((state) => state.playList);
  const { artists, tracks } = searchResult || {};

  useEffect(() => {
    //write debounce function
    let timeOutId;
    const handleSearch = () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        if (searchSong) dispatch(autoCompleteSearch(searchSong));
      }, 1000);
    };

    handleSearch();
  }, [dispatch, searchSong]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.innerText;
    dispatch(Search(text));
    dispatch(setSearchSong(""));
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
          <p
            style={{ cursor: "pointer" }}
            key={index}
            className={`m-0 py-1 px-2 table-hover ${
              index % 2 === 0 ? "bg-primary" : "bg-secondary"
            }`}
            onClick={handleSubmit}>
            {it.term}
          </p>
        ))}
      </div>
    );
  }
  // for search result render
  let searchResultContent = null;
  if (searchLoading) {
    searchResultContent = (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }
  if (searchError) {
    searchResultContent = (
      <div className="text-center text-danger">{searchError}</div>
    );
  }
  if (
    !searchLoading &&
    !searchError &&
    (artists?.hits?.length > 0 || tracks?.hits?.length > 0)
  ) {
    console.log(artists, tracks, "hello");
    searchResultContent = <SearchResult />;
  }
  return (
    <>
      <div
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setSearchSong(e.target.search.value));
        }}>
        <Form className="d-flex justify-content-center">
          <Form.Group controlId="search">
            <Form.Control
              required
              value={searchSong}
              onChange={(e) => dispatch(setSearchSong(e.target.value))}
              type="search"
              name="search"
              placeholder="Let's find some song"
            />
          </Form.Group>
        </Form>
      </div>
      {searchResultContent}
      {searchSong && (
        <div className="d-flex justify-content-center">{content}</div>
      )}
    </>
  );
};

export default SearchPage;
