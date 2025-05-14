import { useState, useEffect} from 'react'
import { processForecastData } from '../../utilities/processForecastData';
import './Forecast.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


const Forecast = ({ data }) => {
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        if (data && data.list) {
            const processed = processForecastData(data.list);
            setForecast(processed);
        }
    }, [data]);

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {Object.entries(forecast).map(([date, item]) => {
                    return (
                        <AccordionItem key={date}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="fore-daily-item">
                                        <img
                                            alt="weather"
                                            className="icon-small"
                                            src={`https://openweathermap.org/img/wn/${item.icon[0]}@2x.png`}
                                        />
                                        <label className="fore-day">{item.day}</label>
                                        <label className="fore-date">{date}</label>
                                        <label className="fore-description">{item.description[0]}</label>
                                        <label className="fore-min-max">
                                            ↑{Math.round(item.minMax.max)}°C / ↓{Math.round(item.minMax.min)}°C
                                        </label>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="details-panel">
                                    <div className="detail-item">
                                        <span className="detail-label">Feels Like:</span>
                                        <span className="detail-value">{item.avg.feels_like}°C</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Wind:</span>
                                        <span className="detail-value">{item.avg.wind} Km/h</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Humidity:</span>
                                        <span className="detail-value">{item.avg.humidity}%</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label"></span>
                                        <span className="detail-value"></span>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </>
    );
};

export default Forecast;