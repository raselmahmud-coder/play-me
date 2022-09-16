import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import PlayListPage from "./pages/PlayListPage";
import SearchPage from "./pages/SearchPage";
import NavBar from "./components/NavBar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";
import Spinner from "./utils/Spinner";
import "./global.css";
import PlayListItem from "./components/PlayListItem";
function App() {
  const { isClick, isLoadingTrack } = useSelector((state) => state.APISlice);
  return (
    <div className="container pb-5">
      <div
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
          <div className="col-md-2 col-lg-2 col-12 ">
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
          <div className="col-md-10 col-lg-10 col-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="playlist" element={<PlayListPage />}>
                <Route
                  index
                  element={
                    <main style={{ padding: "1rem" }}>
                      <h4 className="text-center mt-5">Select here any Playlist</h4>
                    </main>
                  }
                />
                <Route path=":item" element={<PlayListItem />} />
              </Route>
              <Route path="search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </div>
      {isClick &&
        (isLoadingTrack ? (
          <div className="mx-auto text-center">
            <Spinner />
          </div>
        ) : (
          <AudioPlayer />
        ))}
    </div>
  );
}

export default App;
