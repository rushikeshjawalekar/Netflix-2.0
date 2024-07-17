import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTNlNTk5NmYxNmJjMmI3NzA4NWY3NGM3NDY5MGFiZSIsIm5iZiI6MTcyMTIwNjk3OS44MDU0NjUsInN1YiI6IjY2OTc4NzY0ZjQxZDVlZGM5ODQ4YzZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AWpWo2FH12PFDlPU66V18CD_YVgu-ajz_kRzBGGS1HE",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        onClick={() => {
          navigate("/");
        }}
        alt=""
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}
