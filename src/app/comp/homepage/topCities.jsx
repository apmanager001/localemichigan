"use client";
import Link from "next/link";
import React from "react";
import { MapPin, Users, ArrowRight } from "lucide-react";

const TopCities = () => {
  const cities = [
    {
      name: "Detroit",
      population: "674,841",
      county: "Wayne",
      description: "Motor City",
    },
    {
      name: "Grand Rapids",
      population: "198,917",
      county: "Kent",
      description: "Beer City USA",
    },
    {
      name: "Dearborn",
      population: "109,976",
      county: "Wayne",
      description: "Home of Ford",
    },
    {
      name: "Traverse City",
      population: "15,678",
      county: "Grand Traverse",
      description: "Cherry Capital",
    },
    {
      name: "Marquette",
      population: "20,629",
      county: "Marquette",
      description: "Queen City",
    },
    {
      name: "Lansing",
      population: "118,210",
      county: "Ingham",
      description: "Capital City",
    },
    {
      name: "Cadillac",
      population: "10,371",
      county: "Wexford",
      description: "Four Seasons",
    },
    {
      name: "Kalamazoo",
      population: "76,200",
      county: "Kalamazoo",
      description: "The Zoo",
    },
    {
      name: "Gaylord",
      population: "4,286",
      county: "Otsego",
      description: "Alpine Village",
    },
    {
      name: "Flint",
      population: "95,538",
      county: "Genesee",
      description: "Vehicle City",
    },
  ];

  const formatCitySlug = (city) => city.toLowerCase().replace(/\s+/g, "_");

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin size={16} />
            <span>Popular Destinations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Michigan's Top Cities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover local businesses, attractions, and services in the most
            vibrant cities across the Great Lakes State.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cities.map((city, index) => (
            <Link
              key={city.name}
              href={`/cities/${formatCitySlug(city.name)}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-gray-100">
                {/* City Header with Badge */}
                <div className="relative p-4 pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                      {city.name}
                    </h3>
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      #{index + 1}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 italic mb-3">
                    {city.description}
                  </p>
                </div>

                {/* City Stats */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-blue-500" />
                      <span className="font-medium">{city.population}</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                      {city.county} Co.
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
                      Explore City
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-blue-600 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Cities CTA */}
        <div className="text-center mt-12">
          <Link
            href="/cities"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Cities
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCities;
