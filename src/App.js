import './App.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import { useState, useEffect } from 'react'
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import SearchBar from './components/SearchBar/SearchBar'
import Forecast from './components/Forecast/Forecast';
import MapComponent from './components/MapComponent/MapComponent';
import WeatherChart from './components/WeatherChart/WeatherChart';
// import currentLocalData from './mock/current.json';
// import forecaseLocalData from './mock/forecast.json';
import 'leaflet/dist/leaflet.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [address, setAddress] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const address = searchData.label;

    localStorage.setItem("weatherCity", JSON.stringify({ lat, lon, address }));

    setLat(lat)
    setLon(lon)
    setAddress(searchData.label)
    
    // Fetching API Data:
    const currWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currWeatherFetch, forecastFetch])
    .then(async(response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city:address, ...weatherResponse});
      setForecast({city:address, ...forecastResponse});
    })
    .catch((err) => console.log(err));

    // // Fetching Local Data:
    // const currWeatherFetch = currentLocalData
    // const forecastFetch = forecaseLocalData
    
    // setCurrentWeather({city:address, ...currWeatherFetch});
    // setForecast({city:address, ...forecastFetch});
  }

  useEffect(() => {
    const cachedCity = localStorage.getItem("weatherCity");
    if (cachedCity) {
      const { lat, lon, address } = JSON.parse(cachedCity);
      setLat(lat);
      setLon(lon);
      setAddress(address);

      // // Fetching Local Data:
      // const currWeatherFetch = currentLocalData
      // const forecastFetch = forecaseLocalData
      
      // setCurrentWeather({city:address, ...currWeatherFetch});
      // setForecast({city:address, ...forecastFetch});

      // Fetching API Data:
      const currWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

      Promise.all([currWeatherFetch, forecastFetch])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city:address, ...weatherResponse});
        setForecast({city:address, ...forecastResponse});
      })
      .catch((err) => console.log(err));
    }
  }, []);
  
  return (
    <div className="container">
      <SearchBar onSearchChange={handleOnSearchChange}/>
      <div className='map-weather-container'>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        <div className="map-wrapper">
          {lat && <MapComponent data={{lat, lon, address}} />}
        </div>
      </div>
      <div className="forecast-chart-container">
        <div className="forecast-wrapper">
          {forecast && <Forecast data={forecast} />}
        </div>
        <div className="chart-wrapper">
          {forecast && <WeatherChart data={forecast} />}
        </div>
      </div>
    </div>
  );
}

export default App;
