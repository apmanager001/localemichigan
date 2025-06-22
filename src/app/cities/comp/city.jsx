'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useCityStore from "../../comp/store/cityStore";
import Weather from '../comp/weather'
import CityInfo from "./cityInfo";
import CityMap from "./cityMap";

const City = () => {
    const { cities, fetchCities } = useCityStore();
    const { id } = useParams();
    const [cityData, setCityData] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      fetchCities();
    }, []);
    
    useEffect(() => {
      if (id) {
        const formattedId = id.replace(/_/g, " ");
        setSelectedCity(formattedId);
      }
    }, [id]);
    
    useEffect(() => {
      if (selectedCity && cities.length > 0) {
        const city = cities.find(
          (city) => city?.name?.toLowerCase() === selectedCity.toLowerCase()
        );
        setCityData(city || null);
      }
    }, [selectedCity, cities]);
    
  return (
    <div
      className="min-h-[500px] "
      style={{
        backgroundImage: `url('/city.webp')`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "top left",
      }}
    >
      <div
        className="min-h-[500px] mt-10"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="flex flex-col md:flex-row flex-wrap items-center md:items-start md:justify-around mb-10 gap-4">
          {cityData ? (
             <div className="w-80 md:w-[500px] bg-blue-100/50 backdrop-blur-md border-2 border-gray-600 rounded-2xl shadow-xl p-6 space-y-4">
              <CityInfo cityData={cityData} />
            </div>
          ) : (
            <div className="border-2 border-gray-300 skeleton w-72 md:w-[500px] "></div>
          )}
          {cityData ? (
            <div className="border-2 border-gray-600 w-80 md:w-[500px] rounded-xl shadow-xl p-6 flex flex-col bg-blue-100/50 backdrop-blur-md">
            <Weather cityData={cityData} />
          </div>
          ) : (
            <div className="border-2 border-gray-300 skeleton w-72 md:w-[500px] "></div>
          )}
          {cityData ? (
            <div className="w-80 md:w-[500px] border-2 border-gray-600">
              <CityMap lat={cityData.lat} lon={cityData.lon} />
            </div>
          ) : (
            <div className="border-2 border-gray-300 skeleton w-96 "></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default City