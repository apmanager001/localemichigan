import { create } from "zustand";


const useWeatherStore = create((set) => ({
  weather: [],
  loading: false,
  error: null,


  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });
    const baseUrl = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      forecast_days: 6,
      hourly:
        "temperature_2m,wind_speed_10m,cloud_cover,precipitation_probability",
      timezone: "EST",
    });    
    try {
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch weather");
      const data = await response.json();
      set({ weather: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));


export default useWeatherStore;