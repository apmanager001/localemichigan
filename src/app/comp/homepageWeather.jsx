"use client";
import React, { useEffect, useState } from "react";
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

const getWeatherIcon = (cloudCover, precipitation) => {
  if (precipitation > 50) return <Umbrella />;
  if (cloudCover > 75) return <Cloudy />;
  if (cloudCover > 25) return <SunSnow />;
  return <Sun />;
};

const HomepageWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('')
  const [state, setState] = useState("");

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const getCityState = async () => {
          const key = process.env.NEXT_PUBLIC_MAP_API;
          try {
            const res = await fetch(
              `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${key}`
            );
            const data = await res.json();
            console.log(latitude, longitude)
            console.log(data)
            if (data && data.address) {
              setCity(
                data.address.municipality ||
                  data.address.town ||
                  data.address.village ||
                  "Unknown city"
              );
              setState(data.address.state || "Unknown state");
            } else {
              console.warn("No address data found in reverse geocode response");
            }
          } catch (error) {
            console.error("Failed to get city/state:", error);
          }
        };

        if (latitude && longitude) {
          getCityState();
        }
        const baseUrl = "https://api.open-meteo.com/v1/forecast";
        const params = new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          temperature_unit: "fahrenheit",
          wind_speed_unit: "mph",
          forecast_days: "1",
          hourly: "temperature_2m,cloud_cover,precipitation_probability",
          timezone: "auto",
        });

        try {
          const response = await fetch(`${baseUrl}?${params.toString()}`);
          if (!response.ok) throw new Error("Failed to fetch weather");
          const data = await response.json();
          const now = new Date().getHours();
          setWeather({
            temp: data.hourly.temperature_2m[now],
            cloud: data.hourly.cloud_cover[now],
            precip: data.hourly.precipitation_probability[now],
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div className="skeleton h-16 w-64"></div>;
  if (!weather) return <div>Weather unavailable</div>;

  return (
    <div className="flex items-center gap-3 w-fit max-w-xs bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 rounded-3xl shadow-lg">
      <div className="text-2xl">
        {getWeatherIcon(weather.cloud, weather.precip)}
      </div>
      <div className="flex flex-col leading-tight">
        
        <span className="text-lg font-semibold">
          {Math.round(weather.temp)}°F
        </span>
        {city&&state ? 
        <span className="text-sm opacity-80">
          {city}, {state}
        </span>
        : ""}
      </div>
    </div>
  );
};

export default HomepageWeather;