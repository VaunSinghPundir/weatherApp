import React from "react";

export const Forecast = ({ list, units , name,iconUrl}) => {
  const weatherFilter = list.filter((i)=>{
    return i.dt_txt.slice(8,10) === '28'
  })
  console.log("lllllllllll",weatherFilter)
//   console.log("//////", list[0]);

  return (
    <div className="section section-fav">
      {list?.map((item) => {
        // console.log(".........",item?.weather[0])
          return (
            <div className="forecast description">
              <h3> {item.main.temp.toFixed()}°{
                units === "metric" ? "C" : "F"
              }</h3>
              <img src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`} alt="weather-icon" />
              <h3>{`${item?.weather[0].description}`}</h3>
            </div>
          );
      })}
    </div>
  );
};
