import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";
import WeatherDetails from "./WeatherDetails";
import Form from "./Form";
import MostSearched from "./MostSearched";
import WeatherForcast from "./WeatherForecast";
const MainPage = () => {
  const weather = useAppSelector(
    (state: RootState) => state.weather.weatherData
  );
  const is_day = weather?.current.is_day ? "day" : "night";
  let weatherType;
  if (weather?.current.condition.code === 1000) {
    weatherType = "clear";
  } else if (
    [1003, 1006, 1030, 1063, 1087, 1117, 1186, 1189].some(
      (item: number) => item === weather?.current.condition.code
    )
  ) {
    weatherType = "cloud";
  } else if (
    [
      1066, 1150, 1153, 1183, 1192, 1195, 1201, 1204, 1207, 1243, 1246, 1249,
      1252, 1276,
    ].some((item: number) => item === weather?.current.condition.code)
  ) {
    weatherType = "rain";
  } else if (
    [
      1114, 1135, 1147, 1168, 1198, 1210, 1213, 1216, 1219, 1222, 1225, 1237,
      1255, 1258, 1279,
    ].some((item: number) => item === weather?.current.condition.code)
  ) {
    weatherType = "snow";
  } else {
    weatherType = "clear";
  }
  const imageUrl = `/images/${is_day}/${weatherType}.avif`;
  return (
    <div
      style={{
        background: `url(${imageUrl})`,
      }}
      data-testid="main-page"
      className={`main-overlay min-h-screen bg-bottom bg-no-repeat bg-cover text-white relative duration-500 opacity-1`}>
      <WeatherForcast />
      <div className="right-section">
        <Form />
        <MostSearched />
        <WeatherDetails />
      </div>
    </div>
  );
};

export default MainPage;
