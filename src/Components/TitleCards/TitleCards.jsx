import { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import card_data from "../../assets/cards/Cards_data";

export default function TitleCards({ title, category }) {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTNlNTk5NmYxNmJjMmI3NzA4NWY3NGM3NDY5MGFiZSIsIm5iZiI6MTcyMTIwNjk3OS44MDU0NjUsInN1YiI6IjY2OTc4NzY0ZjQxZDVlZGM5ODQ4YzZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AWpWo2FH12PFDlPU66V18CD_YVgu-ajz_kRzBGGS1HE",
    },
  };
  // For scrolling logic
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-Cards">
      <h1> {title ? title : "Popular on Netflix"}</h1>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
