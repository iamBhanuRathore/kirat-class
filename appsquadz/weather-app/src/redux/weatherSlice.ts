import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface WeatherState {
  location: string;
  weatherData: {
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
    };
    current: {
      last_updated_epoch: number;
      last_updated: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: "ESE";
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      feelslike_f: number;
      windchill_c: number;
      windchill_f: number;
      heatindex_c: number;
      heatindex_f: number;
      dewpoint_c: number;
      dewpoint_f: number;
      vis_km: number;
      vis_miles: number;
      uv: number;
      gust_mph: number;
      gust_kph: number;
    };
  } | null;
  error: string | null;
}
// interface FetchWeatherPayload {
//   location: string;
// }
// Should put them in  a .env files --- start
const API_KEY = "57b52c94180f4326850182602241107";
// Should put them in  a .env files --- end

export const fetchWeather = createAsyncThunk<WeatherState, string>(
  "weather/fetchWeather",
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?q=${location}&key=${API_KEY}&unsts=metric`
      );
      return response.data;
    } catch (error: any) {
      alert("Error: " + error.response.data.error.message || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: WeatherState = {
  location: "",
  weatherData: null,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<any>) => {
        state.weatherData = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action: any) => {
        state.weatherData = null;
        state.error = action.payload.message;
      });
  },
});

export const { setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
