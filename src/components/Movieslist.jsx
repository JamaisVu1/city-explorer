import React from "react";

function MoviesList({ movies }) {
  // Check if movies is undefined or null
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
          <li key={index}>
            <img src={movie.image_url} alt={movie.title} />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;