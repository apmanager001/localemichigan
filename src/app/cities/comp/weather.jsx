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

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = new Date().getDay();

  const day = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex + i) % 7;
    day.push(daysOfWeek[dayIndex]);
  }

  const getHourTemp = (weather, dayOffset) => {
    const currentHour = new Date().getHours();
    const hoursInDay = 24;
    const startHour = currentHour + hoursInDay * dayOffset;
    const endHour = startHour + hoursInDay;

    const tempSlice = weather?.hourly?.temperature_2m.slice(startHour, endHour);

    if (!tempSlice || tempSlice.length === 0) return { min: null, max: null };

    const minTemp = Math.min(...tempSlice);
    const maxTemp = Math.max(...tempSlice);

    return { min: minTemp, max: maxTemp };
  };

  const getWeatherIcon = (temp) => {
    if (temp < 32) {
      return <Snowflake className="w-5 h-5 text-blue-500" />;
    } else if (temp < 50) {
      return <SunSnow className="w-5 h-5 text-gray-500" />;
    } else {
      return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getAverage = (data) => {
    if (!data) return null;
    const currentHour = new Date().getHours();
    const slicedData = data.slice(24 - currentHour, 25);

    const total = slicedData.reduce((sum, value) => sum + value, 0);
    const average = total / slicedData.length;

    return average.toFixed(0);
  };

  if (!weather || !weather.hourly) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Weather</h3>
        <div className="text-4xl font-bold text-blue-600">
          {weather?.hourly?.temperature_2m[0]}°F
        </div>
      </div>

      {/* Current Conditions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <MountainSnow className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Elevation</p>
            <p className="font-semibold text-gray-800">{weather.elevation} ft</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Wind className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-semibold text-gray-800">{weather?.hourly?.wind_speed_10m[0]} MPH</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Cloudy className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Cloud Cover</p>
            <p className="font-semibold text-gray-800">{weather?.hourly?.cloud_cover[0]}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Umbrella className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Rain Chance</p>
            <p className="font-semibold text-gray-800">{getAverage(weather?.hourly?.precipitation_probability)}%</p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sun className="w-5 h-5 text-yellow-500" />
          5-Day Forecast
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((offset, index) => {
            const temps = getHourTemp(weather, offset);
            return (
              <div
                key={index}
                className="text-center p-3 bg-gradient-to-b from-blue-50 to-white rounded-lg border border-gray-200"
              >
                <div className="mb-2">
                  {getWeatherIcon(temps.min)}
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{day[offset]}</div>
                <div className="text-xs text-gray-500 mb-1">High</div>
                <div className="text-sm font-bold text-red-600">{temps.max}°</div>
                <div className="text-xs text-gray-500 mb-1">Low</div>
                <div className="text-sm font-bold text-blue-600">{temps.min}°</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
