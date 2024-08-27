const API_Key = "506d54cb792518efb56d76ec41bc5e87";

const makeIconUrl  = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  let data;
  try{
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=${units}`;
  const api = await fetch(URL);
  data = await api.json()
  console.log(data)
}catch(e){
  console.log("error",e)
}
if(data.cod === 404){
  localStorage.removeItem("lastCity");
  window.location.reload();

}
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon , id} = weather[0];

//   console.log(data)
  return {
    id,
    description,
    iconUrl: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };
