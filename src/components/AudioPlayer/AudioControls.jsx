import React from "react";
import { ReactComponent as Play } from "../../assets/play.svg";
import { ReactComponent as Pause } from "../../assets/pause.svg";
import { ReactComponent as Next } from "../../assets/next.svg";
import { ReactComponent as Prev } from "../../assets/prev.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNextTrack,
  handlePrevTrack,
  setIsPlaying,
} from "../../features/Audio/AudioPlayerSlice";

const AudioControls = () => {
  const { isPlaying } = useSelector(
    (state) => state.audioPlayer,
  );
  const dispatch = useDispatch();
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={()=> dispatch(handlePrevTrack())}>
        <Prev />
      </button>
      {isPlaying === "play" && (
        <button
          type="button"
          className="pause"
          onClick={() => dispatch(setIsPlaying("pause"))}
          aria-label="Pause">
          <Pause />
        </button>
      )}
      {(isPlaying === "pause" || isPlaying === "") && (
        <button
          type="button"
          className="play"
          onClick={() => dispatch(setIsPlaying("play"))}
          aria-label="Play">
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={() => dispatch(handleNextTrack())}>
        <Next />
      </button>
    </div>
  );
};

export default AudioControls;
