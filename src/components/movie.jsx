// gpt assisted
import React from "react";

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.image_url} alt={movie.title} />
      <p>{movie.title}</p>
    </li>
  );
}

export default Movie;