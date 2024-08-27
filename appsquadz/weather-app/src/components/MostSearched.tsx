import { fetchWeather, setLocation } from "../redux/weatherSlice";
import { useAppDispatch } from "../redux/hooks";
const MostSearched = () => {
  const dispatch = useAppDispatch();
  const handleClick = (input: string) => {
    if (input === "") return;
    dispatch(setLocation(input));
    dispatch(fetchWeather(input));
  };
  return (
    <ul className="cities py-4 border-b-[1px] border-white flex flex-col gap-y-2">
      <h4 className="text-2xl mt-2">Most Searched</h4>
      {["Noida", "New Delhi", "Atlantic City", "Hong Kong", "Paris"].map(
        (item) => (
          <li
            onClick={() => handleClick(item)}
            className="city cursor-pointer p-2 hover:bg-white/20"
            key={item}>
            {item}
          </li>
        )
      )}
    </ul>
  );
};

export default MostSearched;
