import React from "react";
import { MovieDetail } from '../types/types'

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


function Movie ({movie}:MovieDetail) {
  const {Poster,Title,Year} = movie;
  const poster =
    Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : Poster;
  return (
    <div className="movie">
      <h2>{Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${Title}`}
          src={poster}
        />
      </div>
      <p>({Year})</p>
    </div>
  );
};


export default Movie;