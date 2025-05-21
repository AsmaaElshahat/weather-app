import { getDateAndDay } from './getDateAndDay';

const getAverage = (arr) => {
  if (!arr.length) return 0;
  const sum = arr.reduce((total, value) => total + value, 0);
  return Math.round(sum / arr.length);
};

export const processForecastData = (data) => {
    const processedData = {}
    for (const item of data) {
        const { day, date, time } = getDateAndDay(item.dt)
        const tempMin = Number(item.main.temp_min);
        const tempMax = Number(item.main.temp_max);
        if (date in processedData){
            processedData[date].wind.push(item.wind.speed);
            processedData[date].temp.push(item.main.temp);
            processedData[date].icon.push(item.weather[0].icon);
            processedData[date].description.push(item.weather[0].description);
            processedData[date].feels_like.push(item.main.feels_like);
            processedData[date].humidity.push(item.main.humidity);
            processedData[date].minMax.min = Math.min(processedData[date].minMax.min, tempMin);
            processedData[date].minMax.max = Math.max(processedData[date].minMax.max, tempMax);
            processedData[date].timeTemp.push({ time, temp: item.main.temp });
        } else {
            processedData[date] = {
                day: day,
                wind: [item.wind.speed],
                temp: [item.main.temp],
                icon: [item.weather[0].icon],
                description: [item.weather[0].description],
                feels_like: [item.main.feels_like],
                humidity: [item.main.humidity],
                minMax: {
                    min: tempMin,
                    max: tempMax
                },
                timeTemp: [{ time, temp: item.main.temp }]
            };
        }
    }

    for (const date in processedData) {
        const entry = processedData[date];
        entry.avg = {
        wind: Math.round(getAverage(entry.wind) * 3.6),
        temp: getAverage(entry.temp),
        feels_like: getAverage(entry.feels_like),   
        humidity: getAverage(entry.humidity),
        };
    }

    const date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    processedData[currentDate].day = 'Today'

    return processedData;
};

