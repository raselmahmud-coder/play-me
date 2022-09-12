import React, { useEffect } from "react";

const HomePage = () => {
  const [music, setMusic] = React.useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5350642341msh795a42b4d1f7467p194d25jsnd346031e1cb7",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    fetch(
      "https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US",
      options,
    )
      .then((response) => response.json())
      .then((response) => setMusic(response))
      .catch((err) => console.error(err));
  }, []);
  console.log(music);
  return (
    <div>
      
      {/* should be audio player here */}
    </div>
  );
};

export default HomePage;
