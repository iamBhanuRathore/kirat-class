import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import moment from "moment";

const WeatherForcast = () => {
  const weather = useAppSelector(
    (state: RootState) => state.weather.weatherData
  );
  console.log(weather);
  return (
    <div className="md:absolute min-h-42 top-0 left-0 w-full h-full flex items-center justify-between flex-col p-4">
      <h3 className="brand">{weather?.location.country}</h3>
      <div className="flex justify-center md:w-[70%]  flex-1 items-end md:mr-auto md:text-xl gap-x-5">
        <p>Feels Like: {weather?.current.feelslike_c} &#176;</p>
        <p>Heat Index: {weather?.current.heatindex_c} &#176;</p>
      </div>
      <div className="flex justify-center md:w-[70%]  md:mr-auto items-center gap-x-5">
        <h1 className="temp text-2xl md:text-6xl">
          {weather?.current.temp_c} &#176;
        </h1>
        <div className="city-time">
          <h1 className="name m-0 mb-2">{weather?.location.name}</h1>
          <p>
            {moment(weather?.location.localtime).format(
              "hh:mm a - dddd MMM DD YYYY"
            )}
          </p>
        </div>
        <div className="weather">
          <img
            src={
              weather?.current.condition.icon ||
              "https://cdn.weatherapi.com/weather/64x64/day/113.png"
            }
            className="icon block my-2"
            alt="icon"
            height={50}
            width={50}
          />
          <span className="condition">{weather?.current.condition.text}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherForcast;
