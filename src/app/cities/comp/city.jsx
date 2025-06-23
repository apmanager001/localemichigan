'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useCityStore from "../../comp/store/cityStore";
import Weather from '../comp/weather'
import CityInfo from "./cityInfo";
import CityMap from "./cityMap";

import Facebook from "./facebook";
import SocialLinks from "./socialLinks";

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
        <div className="md:p-6 max-w-screen-lg mx-auto md:rounded-xl shadow-xl bg-blue-100/50 backdrop-blur-lg md:border-2 border-gray-600 space-y-6">
          {cityData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr] gap-4">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"> */}
                <div className="xl:col-start-1 xl:col-end-2 xl:row-start-1">
                  <h1 className="text-3xl font-bold text-center text-gray-800">
                    {cityData?.name}, Michigan
                  </h1>
                </div>

                {/* Column 2: Social Links */}
                <div className="xl:col-start-2 xl:col-end-3 xl:row-start-1">
                  <SocialLinks cityData={cityData} />
                </div>

                {/* Column 3: View on Map Button */}
                <div className="md:col-start-2 xl:col-start-3 xl:col-end-4 xl:row-start-1">
                  <div className="flex justify-center">
                    <a
                      href={`https://www.google.com/maps?q=${cityData?.lat},${cityData?.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-soft btn-primary"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
                <div className="xl:col-start-1 xl:col-end-4 xl:row-start-2 px-6 md:px-0">
                  <Weather cityData={cityData} />
                </div>
                <div className="xl:col-span-1 xl:row-start-3 px-6 md:px-0">
                  <CityInfo cityData={cityData} />
                </div>

                {/* Facebook – spans 3 columns if it exists */}
                {cityData.facebook && (
                  <div className="xl:col-span-2 xl:row-span-3">
                    <Facebook cityData={cityData} />
                  </div>
                )}

                {/* Map – spans 1 column */}
                <div className="xl:col-span-1 xl:row-start-4">
                  <CityMap lat={cityData.lat} lon={cityData.lon} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default City