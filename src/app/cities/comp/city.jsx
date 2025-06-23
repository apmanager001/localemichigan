'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useCityStore from "../../comp/store/cityStore";
import Weather from '../comp/weather'
import CityInfo from "./cityInfo";
import CityMap from "./cityMap";

import Facebook from "./facebook";

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

  const mainClass =
    "border-2 border-gray-600 min-w-[500px] rounded-xl shadow-xl p-6 flex flex-col bg-blue-100/50 backdrop-blur-md";
  const skeleton = "skeleton w-80 h-80";
  // 'border-2 border-gray-600 w-80 md:w-[500px] rounded-xl shadow-xl p-6 flex flex-col bg-blue-100/50 backdrop-blur-md'
  // w-80 md:w-[500px] bg-blue-100/50 backdrop-blur-md border-2 border-gray-600 rounded-2xl shadow-xl p-6 space-y-4

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
        className="min-h-[500px] py-10"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="p-6 max-w-screen-lg mx-auto md:rounded-xl shadow-xl bg-blue-100/50 backdrop-blur-lg md:border-2 border-gray-600 space-y-6">
          {cityData && (
            <>
              {/* Weather at Top */}
              <div>
                <Weather cityData={cityData} />
              </div>

              {/* Grid for Info / Facebook / Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <CityInfo cityData={cityData} />
                {cityData.facebook && <Facebook cityData={cityData} />}
                <CityMap lat={cityData.lat} lon={cityData.lon} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default City