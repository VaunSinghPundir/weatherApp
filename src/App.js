import './App.css';
import hotBg from "./assets/hot-pexel.jpg";
import coldBg from "./assets/cold.jpg";
import { Description } from "./Components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService.js";
import { CiBookmark } from "react-icons/ci";
import { Favourite } from './Components/Favourite.jsx';

function App() {
  const [city, setCity] = useState('delhi');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const fav = JSON.parse(localStorage.getItem('favArray')) || [];
  const [favouriteWeather,setfavouriteWeather] = useState(fav);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const threshold = units === 'metric' ? 18 : 64;
      if(data.temp <= threshold){
        setBg(coldBg);
      }
      else {
        setBg(hotBg);
      }
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === 'C';
    button.innerText = isCelcius ? '°F' : '°C';

    setUnits(isCelcius ? 'metric' : 'imperial');
  }

  const enterKeypressed = (e) =>{
    if(e.key === "Enter"){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  const addFav = (e) => {
    let isAlreadyFavourite = false;
    favouriteWeather.map((item)=>{
       item.id === weather.id ? isAlreadyFavourite = true : isAlreadyFavourite = false;
    }) 
    console.log("iss",isAlreadyFavourite);
    console.log(weather)
    if (!isAlreadyFavourite) {
      const weatherArray = [...favouriteWeather, weather];
      setfavouriteWeather(weatherArray);
      // console.log("weat",weather);
      // console.log("fav", favouriteWeather);
      localStorage.setItem('favArray', JSON.stringify(weatherArray));
    } else {
      console.log("Weather is already in favorites");
    }
  };
  // console.log(favouriteWeather)
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section-input">
              <input onKeyDown={enterKeypressed} type="text" name="city" placeholder="Enter your city..." />
              <div className='btn-box'>
                <h2 className='fav' onClick={(e)=> addFav(e)}><CiBookmark  /></h2>
              &nbsp;
              &nbsp;
              <button onClick={(e)=> handleUnitsClick(e)}>°F</button></div>
            </div>
            <div className="section secton-temperature">
              <div className="description">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt="weather-icon" />
                <h3>{`${weather.description}`}</h3>
              </div>

              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${units === "metric" ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            <Description weather = {weather} units={units}/>
            <Favourite favouriteWeather={favouriteWeather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
