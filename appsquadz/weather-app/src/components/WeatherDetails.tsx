import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";
const WeatherDetails = () => {
  const weather = useAppSelector(
    (state: RootState) => state.weather.weatherData
  );
  console.log(weather);
  return (
    <ul className="details py-4 border-b-[1px] border-white flex flex-col gap-y-6">
      <h4 className="text-2xl mt-2">Weather Details</h4>
      <li className="flex justify-between">
        <span>Cloudy</span>
        <span className="cloud">{weather?.current.cloud}%</span>
      </li>
      <li className="flex justify-between">
        <span>Humidity</span>
        <span className="humidity">{weather?.current.humidity}%</span>
      </li>
      <li className="flex justify-between">
        <span>Wind</span>
        <span className="Wind">{weather?.current.wind_kph}Km/h</span>
      </li>
      <li className="flex justify-between">
        <span>Wind Direction</span>
        <span className="Wind">{weather?.current.wind_dir}</span>
      </li>
      <li className="flex justify-between">
        <span>Wind Degree</span>
        <span className="Wind">{weather?.current.wind_degree} &#176;</span>
      </li>
      <li className="flex justify-between">
        <span>Time Zone</span>
        <span className="Wind">{weather?.location.tz_id}</span>
      </li>
    </ul>
  );
};

export default WeatherDetails;
