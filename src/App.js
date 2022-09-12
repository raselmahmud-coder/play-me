import { Route, Routes } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer.jsx";
import tracks from "./components/AudioPlayer/tracks";
function App() {
  return (
    <div className="container">
      {/*  <div
        style={{
          height: "100vh",
          position: "relative",
        }}>
        <div
          className="row"
          style={{
            margin: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "80vh",
            width: "90vw",
            borderRadius: "50px",
            background: "linear-gradient(145deg, #cccbdd, #f3f1ff)",
            boxShadow: "5px 5px 12px #5b5a62, -5px -5px 12px #ffffff",
          }}>
          <div className="col-md-2">
            <div
              style={{
                position: "relative",
                width: "100%",
                top: "50%",
                left: "38%",
                transform: "translate(-50%, -50%)",
              }}>
              <NavBar />
            </div>
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="playlist" element={<PlayListPage />} />
              <Route path="search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </div> */}
      <AudioPlayer tracks={tracks} />
    </div>
  );
}

export default App;
