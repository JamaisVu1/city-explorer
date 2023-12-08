import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from "./components/Map.jsx";
import Weather from "./components/Weather.jsx";
import MoviesList from "./components/Movieslist.jsx";

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER = "https://city-explorer-api-u718.onrender.com"

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState([]); // State to store weather data

  async function changeCity(newCity) {
    await getLocation(newCity);
    console.log("Changing to", newCity);
  }

  async function weatherData(latitude, longitude) {
    console.log(latitude, longitude);
    const url = `${SERVER}/weather?lat=${latitude}&lon=${longitude}`
    try {
      let response = await axios.get(url)
      // let response = await axios.get(`${SERVER}/weather`, {
      //   params: { lat: latitude, lon: longitude },
      // });

      setWeatherForecast(response.data);

      console.log(response);
    } catch {
      console.log("weatherdata broke");
    }
  }

  async function getMoviesData(cityName) {
  try {
    const moviesResponse = await axios.get(`${SERVER}/movies`, {
      params: {
        city: cityName,
      },
    });
    console.log(moviesResponse);
    
    
    setMovies(moviesResponse.data);
    
    console.log(movies);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}

  async function getLocation(cityName) {
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    console.log(url);
    try {
      let response = await axios.get(url);
      console.log(response);
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
console.log(movies);
  return (
    <>
      <Header />
      <CityForm city={city} handleChangeCity={changeCity} />
      <Weather weatherForecast= {weatherForecast} />
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
