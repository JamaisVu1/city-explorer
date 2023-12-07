import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`);
        setForecastData(response.data);
        setError(null);
      } catch (error) {
        console.error(error.message);
        setError(
          `Error fetching weather data. Status Code: ${
            error.response?.status || "Unknown"
          }. ${error.message}`
        );
      }
    };

    if (lat !== null && lon !== null) {
      fetchWeatherData();
    }
  }, [lat, lon]);

  return (
    <div>
      {forecastData && (
        <div>
          <h2>Weather Forecast for {forecastData.city}</h2>
          {forecastData.forecast.map((day, index) => (
            <div key={index}>
              <p>Date: {day.date}</p>
              <p>Description: {day.description}</p>
              
            </div>
          ))}
        </div>
      )}
      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;