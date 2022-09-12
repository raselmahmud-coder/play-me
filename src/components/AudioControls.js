import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { ImNext, ImPrevious } from "react-icons/im";
import "./audioPlayer.css";
const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}>
      <ImPrevious />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause">
        <AiOutlinePauseCircle />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play">
        <AiOutlinePlayCircle />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}>
      <ImNext />
    </button>
  </div>
);

export default AudioControls;
