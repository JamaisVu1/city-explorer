import React from "react";

const WeatherDay = ({ day }) => {
  return (
    <div>
      <p>Date: {day.date}</p>
      <p>Description: {day.description}</p>
      <hr />
    </div>
  );
};

export default WeatherDay;