import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MainPage from "./MainPage";

const mockStore = configureStore([]);

describe("MainPage Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      weather: {
        location: {
          name: "Noida",
          region: "Uttar Pradesh",
          country: "India",
          lat: 28.57,
          lon: 77.32,
          tz_id: "Asia/Kolkata",
          localtime_epoch: 1720991495,
          localtime: "2024-07-15 2:41",
        },
        current: {
          last_updated_epoch: 1720990800,
          last_updated: "2024-07-15 02:30",
          temp_c: 31.3,
          temp_f: 88.3,
          is_day: 0,
          condition: {
            text: "Mist",
            icon: "//cdn.weatherapi.com/weather/64x64/night/143.png",
            code: 1030,
          },
          wind_mph: 4.3,
          wind_kph: 6.8,
          wind_degree: 110,
          wind_dir: "ESE",
          pressure_mb: 999.0,
          pressure_in: 29.5,
          precip_mm: 0.0,
          precip_in: 0.0,
          humidity: 84,
          cloud: 25,
          feelslike_c: 32.9,
          feelslike_f: 91.1,
          windchill_c: 34.6,
          windchill_f: 94.3,
          heatindex_c: 38.9,
          heatindex_f: 102.1,
          dewpoint_c: 21.2,
          dewpoint_f: 70.2,
          vis_km: 3.5,
          vis_miles: 2.0,
          uv: 1.0,
          gust_mph: 6.6,
          gust_kph: 10.7,
        },
      },
    });
  });

  test("renders MainPage component", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const mainPageElement = getByTestId("main-page");
    expect(mainPageElement).toBeInTheDocument();
  });
});
