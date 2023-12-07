import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from "./components/Map.jsx";
import Weather from "./components/Weather.jsx";
import MoviesList from "./components/Movieslist.jsx";

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER = import.meta.env.SERVER;

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  

  async function changeCity(newCity) {
    await getLocation(newCity);
    console.log("Changing to", newCity);
  }

  async function weatherData(latitude, longitude) {
    try {
      let response = await axios.get(SERVER, {
        params: { latitude: latitude, longitude: longitude },
      });
    } catch {
      console.log("weatherdata broke");
    }
  }

  async function getMoviesData(cityName) {
    try {
      const moviesResponse = await axios.get('http://localhost:3000/movies', {
        params: {
          city: cityName,
        },
      });

      setMovies(moviesResponse.data.movies);
    } catch (error) {
      console.error('Error fetching movie data:', error.message);
    }
  }

  async function getLocation(cityName) {
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);

      setCity(response.data[0].display_name);
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      weatherData(response.data[0].lat, response.data[0].lon);

      
      getMoviesData(cityName);

      setError(null);
    } catch (error) {
      console.error(error.message);
      setError(
        `Error fetching location data. Status Code: ${
          error.response?.status || "Unknown"
        }. ${error.message}`
      );
    }
  }

  return (
    <>
      <Header />
      <CityForm city={city} handleChangeCity={changeCity} />
      <Weather lat={latitude} lon={longitude} />
      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
      <MoviesList movies={movies} />
      <Map latitude={latitude} longitude={longitude} />
    </>
  );
}

export default App;

