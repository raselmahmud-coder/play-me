import React, { useEffect } from "react";
import SingleSong from "../components/SingleSong";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorageItem } from "../features/playList/playListSlice";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { localStorageItem } = useSelector((state) => state.playList);
  useEffect(() => {
    dispatch(setLocalStorageItem(JSON.parse(localStorage.getItem("favorite"))));
  }, [dispatch]);
  console.log(localStorageItem);
  // decide what to render
  let content;
  if (localStorageItem?.length === 0 || localStorageItem === null) {
    content = <div className="text-center">No Favorite Song</div>;
  }
  if (localStorageItem?.length > 0)
    content = localStorageItem.map((item) => (
      <SingleSong item={item.key} song={item} />
    ));
  return (
    <div className="row">
      <h3 className="text-center mb-4 mt-2">Favorites Music</h3>
      {content}
    </div>
  );
};

export default FavoritesPage;
