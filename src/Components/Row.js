import React, { useState } from "react";
import axios from "../Utils/axios";
import { useEffect } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_url = "http://image.tmdb.org/t/p/original/";
const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  //a snippet of code whivh runs on a specific condition/variable
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
    // return () => {
    //   second
    // }
  }, [props.fetchUrl]);
  //   if [] ,run once when the row loads ad dont run again
  //   console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.original_title || "")
        .then((url) => {
          console.log(movie);
          const urlparams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlparams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      {/*Container->posters */}

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
