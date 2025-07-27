"use client";
import React, { useState, useEffect } from "react";
import { Search, MapPin, Building2, Users } from "lucide-react";
import Link from "next/link";
import useCityStore from "../../comp/store/cityStore";

const Cities = () => {
  const { cities, fetchCities } = useCityStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const filteredCities = cities
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((city) => city.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/city.webp')`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "top left",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Michigan Cities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore every city and town across the Great Lakes State. From
            bustling urban centers to charming small towns, discover the unique
            character of Michigan's communities.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {cities.length}
              </div>
              <div className="text-sm text-gray-500">Total Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredCities.length}
              </div>
              <div className="text-sm text-gray-500">Showing</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm transition-all duration-200"
            />
          </div>
          {query && (
            <div className="mt-2 text-sm text-gray-500 text-center">
              {filteredCities.length === 0 ? (
                <span className="text-red-500">
                  No cities found matching "{query}"
                </span>
              ) : (
                <span>Found {filteredCities.length} cities</span>
              )}
            </div>
          )}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredCities.map((city, index) => (
            <Link
              key={index}
              href={`/cities/${city.name.replace(/\s+/g, "_")}`}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200/50 hover:border-blue-300 hover:bg-white/90 transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors leading-tight">
                  {city.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCities.length === 0 && !query && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Cities Found
            </h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200/50">
          <p className="text-sm text-gray-500">
            Discover detailed information about each city including
            demographics, geography, and local resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cities;
