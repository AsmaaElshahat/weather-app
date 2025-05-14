import './CurrentWeather.css';

const CurrentWeather = ({data}) => {
  return (
    <div className='curr-weather-container'>
        <div className='curr-weather-top'>
            <div className='curr-p-wrapper'>
                <p className='city'>{data.city}</p>
                <p className='curr-temp'>{Math.round(data.main.temp)}°c</p>
                <p className='weather-desc'>{data.weather[0].description}</p>
            </div>
            <img alt="weather" className='weather-icon' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
        </div>
        <div className='curr-weather-bottom'>
            <div className='curr-details'>
                <div className='curr-row'>
                    <span className='par-label'>Details:</span>
                </div>
                <div className='curr-row'>
                    <span className='par-label'>Feels Like</span>
                    <span className='par-value'>{Math.round(data.main.feels_like)}°c</span>
                </div>
                <div className='curr-row'>
                    <span className='par-label'>Wind</span>
                    <span className='par-value'>{Math.round(data.wind.speed * 3.6)} Km/h</span>
                </div>
                <div className='curr-row'>
                    <span className='par-label'>Humidity</span>
                    <span className='par-value'>{data.main.humidity}%</span>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default CurrentWeather
