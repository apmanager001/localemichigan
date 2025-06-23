"use client";
import React, { useEffect } from "react";
import useWeatherStore from "../../comp/store/weather";
import {
  MountainSnow,
  Wind,
  Thermometer,
  Cloudy,
  Sun,
  SunSnow,
  Snowflake,
  Umbrella,
} from "lucide-react";

const Weather = ({ cityData }) => {
  const { weather, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(cityData.lat, cityData.lon);
  }, []);

  const paragraph = "pl-2 text-md text-gray-700 flex gap-2";
  const span = "pl-2 text-gray-600 font-bold";

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = new Date().getDay(); // Get current day index (0-6)

  const day = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex + i) % 7; // Calculate the index for each day of the week
    day.push(daysOfWeek[dayIndex]);
  }

  const getHourTemp = (weather, dayOffset) => {
    const currentHour = new Date().getHours();
    const hoursInDay = 24;
    const startHour = currentHour + hoursInDay * dayOffset;
    const endHour = startHour + hoursInDay;

    // Slice the array to get the temperatures for the specified range
    const tempSlice = weather?.hourly?.temperature_2m.slice(startHour, endHour);

    if (!tempSlice || tempSlice.length === 0) return { min: null, max: null };

    // Get the minimum and maximum temperatures in the slice
    const minTemp = Math.min(...tempSlice);
    const maxTemp = Math.max(...tempSlice);

    return { min: minTemp, max: maxTemp };
  };

  const getWeatherIcon = (temp) => {
    if (temp < 32) {
      return <Snowflake />;
    } else if (temp < 50) {
      return <SunSnow />;
    } else {
      return <Sun />;
    }
  };

  const getAverage = (data) => {
    if (!data) return null; // Return null if data is undefined
    const currentHour = new Date().getHours();
    const slicedData = data.slice(24 - currentHour, 25); // Slice the data

    const total = slicedData.reduce((sum, value) => sum + value, 0); // Sum the values
    const average = total / slicedData.length; // Calculate the average

    return average.toFixed(0);
  };

  return (
        <>
          <h3 className="font-bold">Weather:</h3>
          <p className={`${paragraph}`}>
            <MountainSnow />
            Elevation:<span className={`${span}`}>{weather.elevation}</span>
          </p>
          <p className={`${paragraph}`}>
            <Wind />
            Wind:
            <span className={`${span}`}>
              {weather?.hourly?.wind_speed_10m[0]} MPH
            </span>
          </p>
          <p className={`${paragraph}`}>
            <Cloudy />
            Current Cloud Coverage:
            <span className={`${span}`}>
              {weather?.hourly?.cloud_cover[0]}%
            </span>
          </p>
          <p className={`${paragraph}`}>
            <Thermometer />
            Current Temp:
            <span className={`${span}`}>
              {weather?.hourly?.temperature_2m[0]} °F
            </span>
          </p>
          <p className={`${paragraph}`}>
            <Umbrella />
            Rain Probability:
            <span className={`${span}`}>
              {getAverage(weather?.hourly?.precipitation_probability)} %
            </span>
          </p>
          <p className={`${paragraph}`}>
            <Sun /> 5 Day Forecast
          </p>
          {weather ? (
            <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-2 justify-center items-center my-2">
              {[1, 2, 3, 4, 5].map((offset, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center px-4 ${
                    index !== 4 ? "md:border-r-2 md:border-black" : ""
                  } ${
                    index !== 2 ? "border-r-2  border-black md:border-0" : ""
                  }`}
                >
                  <div className="mb-1">
                    {getWeatherIcon(getHourTemp(weather, offset).min)}
                  </div>
                  <div className="mt-1 font-extrabold">{day[offset]}</div>
                  <div className="mt-1 flex flex-col font-bold">
                    <span className="font-medium">High:</span>
                    {getHourTemp(weather, offset).max} °F
                  </div>
                  <div className="mt-1 flex flex-col font-bold">
                    <span className="font-medium">Low:</span>
                    {getHourTemp(weather, offset).min} °F
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </>
  );
};

export default Weather;
