import { create } from "zustand";

const useCityStore = create((set) => ({
  cities: [],
  loading: false,
  error: null,
  choosenLatitude: null,
  choosenLongitude: null,
  name: null,
  distance: 10,

  // Function to fetch cities
  fetchCities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/data/cities.json");
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      set({ cities: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  setChoosenCity: (cityName, latitude, longitude) => {
    set({
      name: cityName,
      choosenLatitude: latitude,
      choosenLongitude: longitude,
      
    });
  },
  setDistance: (distance) => {
    set({ distance: distance });
  },
}));

export const fetchCities = useCityStore.getState().fetchCities;

export default useCityStore;
