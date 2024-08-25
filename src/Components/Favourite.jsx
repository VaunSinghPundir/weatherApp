import React from "react";

export const Favourite = ({ favouriteWeather, units, handleFavClick}) => {

  return (
    <>{favouriteWeather.length == 0 ? "" : <div className="section section-fav">
      {favouriteWeather.map((weather) => {
        return (
          <div className="favbox description" onClick={()=> handleFavClick(weather.name)}>
            <h3>{`${weather.name}, ${weather.temp.toFixed()}°${units === "metric" ? 'C' : 'F'}`}</h3>
            <img src={weather.iconUrl} alt="weather-icon" />
            <h3>{`${weather.description}`}</h3>
          </div>
        );
      })}

    </div>}</>
  );
};
