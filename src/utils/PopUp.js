import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist, setShowPopUp } from "../features/playList/playListSlice";

function PopUp() {
  const dispatch = useDispatch();
  const { showPopUp } = useSelector((state) => state.playList);

  const handleClose = () => dispatch(setShowPopUp(false));
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.playlist.value;
    const newText = text.split(" ").join("-");
    const playlist = JSON.parse(localStorage.getItem("playlist"));
    if (playlist?.length > 9) {
      alert("You can only create 10 playlists");
    } else {
      if (playlist === null || playlist?.length === 0) {
        localStorage.setItem("playlist", JSON.stringify([newText]));
      } else {
        localStorage.setItem("playlist", JSON.stringify([...playlist, newText]));
      }
      dispatch(setPlaylist(JSON.parse(localStorage.getItem("playlist"))));
    }
    handleClose();
  };
  return (
    <>
      <Modal show={showPopUp} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Give your Playlist name</h5>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control
                required
                type="text"
                name="playlist"
                placeholder="Enter playlist name"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default PopUp;
