import { configureStore } from "@reduxjs/toolkit";
import weatherReducer, { WeatherState } from "./weatherSlice"; // import WeatherState
const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type RootState = {
  weather: WeatherState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
