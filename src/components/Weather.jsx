// gpt assisted
import React from "react";

const WeatherDisplay = ({ weatherForecast }) => {
  console.log(weatherForecast.forecast);
  const forecastArray = weatherForecast.forecast || [];
  return (
    <div>
      <h2>Weather Forecast</h2>
      {forecastArray.map((day, index) => (
        <div key={index}>
          <p>Date: {day.date}</p>
          <p>Description: {day.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;