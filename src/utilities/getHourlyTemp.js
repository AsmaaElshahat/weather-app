import { getDateAndDay } from './getDateAndDay';
export const GetHourlyTemp = (data) => {
    const Hourlytemp = []
    for (const item of data) {
        const { day, date, time } = getDateAndDay(item.dt)
        Hourlytemp.push({ time, temp: item.main.temp });
    }
    return Hourlytemp;
    console.log(Hourlytemp)
}
