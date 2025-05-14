import './App.css';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import SearchBar from './components/SearchBar/SearchBar'
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import { useState } from 'react'
import Forecast from './components/Forecast/Forecast';
// import currentLocalData from './mock/current.json';
// import forecaseLocalData from './mock/forecast.json';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    // Fetching Local Data:
    // const currWeatherFetch = currentLocalData
    // const forecastFetch = forecaseLocalData
    
    // setCurrentWeather({city:searchData.label, ...currWeatherFetch});
    // setForecast({city:searchData.label, ...forecastFetch});


    Promise.all([currWeatherFetch, forecastFetch])
    .then(async(response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city:searchData.label, ...weatherResponse});
      setForecast({city:searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <SearchBar onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
