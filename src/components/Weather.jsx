// gpt assisted


import React from "react";
import WeatherDay from "./weatherDay"; 

const WeatherDisplay = ({ weatherForecast }) => {
  console.log(weatherForecast.forecast);
  const forecastArray = weatherForecast.forecast || [];
  
  return (
    <div>
      <h2>Weather Forecast</h2>
      {forecastArray.map((day, index) => (
        <WeatherDay key={index} day={day} />
      ))}
    </div>
  );
};

export default WeatherDisplay;