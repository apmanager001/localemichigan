"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import useCityStore from "../../comp/store/cityStore";
import {
  DynamicWeather,
  DynamicCityMap,
  DynamicFacebook,
  DynamicTwitterFeed,
  DynamicInstagramFeed,
} from "../../comp/utility/dynamicImports";
import CityInfo from "./cityInfo";
import SocialLinks from "./socialLinks";

const City = () => {
  const { cities, fetchCities } = useCityStore();
  const { id } = useParams();
  const [cityData, setCityData] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);

  // Memoize the formatted city ID
  const formattedCityId = useMemo(() => {
    return id ? id.replace(/_/g, " ") : "";
  }, [id]);

  // Memoize city data lookup
  const foundCity = useMemo(() => {
    if (!selectedCity || cities.length === 0) return null;
    return cities.find(
      (city) => city?.name?.toLowerCase() === selectedCity.toLowerCase()
    );
  }, [selectedCity, cities]);

  // Memoize social feeds availability
  const hasSocialFeeds = useMemo(() => {
    return cityData?.facebook || cityData?.twitter || cityData?.instagram;
  }, [cityData]);

  // Memoize county display
  const countyDisplay = useMemo(() => {
    if (!cityData?.county) return "";
    return Array.isArray(cityData.county)
      ? cityData.county.join(", ")
      : cityData.county;
  }, [cityData?.county]);

  // Memoize Google Maps URL
  const googleMapsUrl = useMemo(() => {
    if (!cityData?.lat || !cityData?.lon) return "#";
    return `https://www.google.com/maps?q=${cityData.lat},${cityData.lon}`;
  }, [cityData?.lat, cityData?.lon]);

  // Optimized fetch function
  const fetchCitiesData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchCities();
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchCities]);

  useEffect(() => {
    fetchCitiesData();
  }, [fetchCitiesData]);

  useEffect(() => {
    if (formattedCityId) {
      setSelectedCity(formattedCityId);
    }
  }, [formattedCityId]);

  useEffect(() => {
    setCityData(foundCity);
  }, [foundCity]);

  // Loading state with proper dimensions to prevent layout shifts
  if (loading || !cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Hero section skeleton to prevent layout shift */}
        <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-16 bg-blue-500 rounded-lg mb-4 mx-auto max-w-md"></div>
                <div className="h-8 bg-blue-400 rounded-lg mb-6 mx-auto max-w-sm"></div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="h-12 bg-white rounded-lg w-32"></div>
                  <div className="h-12 bg-white rounded-lg w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6 pb-0">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {cityData.name}, Michigan
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              {cityData.place?.toUpperCase()} • {countyDisplay}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SocialLinks cityData={cityData} />
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                View on Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Weather & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weather Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <DynamicWeather cityData={cityData} />
            </div>

            {/* City Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                City Information
              </h3>
              <CityInfo cityData={cityData} />
            </div>
          </div>

          {/* Right Column - Map & Social Feeds */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 pb-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Location
                </h3>
              </div>
              <div className="h-64 w-full">
                <DynamicCityMap lat={cityData.lat} lon={cityData.lon} />
              </div>
            </div>

            {/* Social Media Feeds */}
            {hasSocialFeeds && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Social Media
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {/* Facebook Feed */}
                  {cityData.facebook && (
                    <div className="bg-gray-50 rounded-xl p-4 h-80">
                      <DynamicFacebook cityData={cityData} />
                    </div>
                  )}

                  {/* Twitter Feed */}
                  {cityData.twitter && (
                    <div className="bg-gray-50 rounded-xl p-4 h-80">
                      <DynamicTwitterFeed cityData={cityData} />
                    </div>
                  )}

                  {/* Instagram Feed */}
                  {cityData.instagram && (
                    <div className="bg-gray-50 rounded-xl p-4 h-80">
                      <DynamicInstagramFeed cityData={cityData} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
