import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { GetHourlyTemp } from '../../utilities/getHourlyTemp';
import './WeatherChart.css';

const WeatherChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (data && data.list) {
        const dayData = GetHourlyTemp(data.list.slice(0,8));
        console.log(dayData)

        const chartData = dayData.map(item => ({
          time: item.time,
          temp: Math.round(item.temp),
        }));

        setChartOptions({
          data: chartData,
          autoSize: true,
          series: [
            {
              type: 'line',
              xKey: 'time',
              yKey: 'temp',
              yName: 'Temperature (°C)',
              interpolation: {
                type: 'smooth'
              },
              marker: {
                enabled: true
              }
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: { text: 'Time' }
            },
            {
              type: 'number',
              position: 'left',
              title: { text: 'Temperature (°C)' }
            }
          ],
          title: {
            text: `Temperature Changes Throughout the Day`,
          },
        });
      }
  }, [data]);

  return (
    <div className="weather-chart-container">
      {chartOptions ? <AgCharts options={chartOptions} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default WeatherChart;
