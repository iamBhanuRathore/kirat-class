import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { fetchWeather, setLocation } from "../redux/weatherSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
const Form = () => {
  const [input, setInput] = useState<string>("noida");
  const dispatch = useAppDispatch();
  const weather = useAppSelector(
    (state: RootState) => state.weather.weatherData
  );
  const handleSearch = () => {
    if (input === "") return;
    dispatch(setLocation(input));
    dispatch(fetchWeather(input));
  };
  useEffect(() => {
    dispatch(setLocation(input));
    dispatch(fetchWeather(input));
  }, []);
  useEffect(() => {
    setInput(weather?.location.name || "");
  }, [weather?.location.name]);
  return (
    <div>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className="search bg-transparent w-full h-10 border-b-[1px] border-white focus:outline-none placeholder:text-white"
        placeholder="Search Location.."
      />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 p-4 m-0 border-none outline-none bg-[#fa6d1b] text-white cursor-pointer text-2xl duration-400 hover:bg-white hover:text-black">
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
};
export default Form;
