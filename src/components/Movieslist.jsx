// gpt assisted
import React from "react";
import Movie from "./movie"; 

function MoviesList({ movies }) {
  console.log(movies);
  if (!movies || movies.length === 0) {
    return (
      <div>
        <h2>No Movies Found</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;