"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import useCityStore from '../../comp/store/cityStore'

export async function generateMetadata() {
  return {
    title: `All Michigan Cities | Locale Michigan`,
    description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information.`,
    openGraph: {
      title: `All Michigan Cities | Locale Michigan`,
      description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information.`,
      images: [`https://localemichigan.com/`],
      url: `https://localemichigan.com/news/cities}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const Cities = () => {
  const { cities, fetchCities } = useCityStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const filteredCities = cities
    .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical sort
    .filter(
      (city) => city.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive match
    );

  
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
        className="min-h-[500px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-10">
          {/* Back Button */}
          <div className="w-full lg:w-auto"></div>

          {/* Centered Heading */}
          <h2 className="text-2xl font-extrabold text-center flex-1">
            All Michigan Cities
          </h2>

          {/* Article Count */}
          <div className="w-full lg:w-auto text-right">
            <h3 className="text-sm text-gray-400">
              Number of Cities: {filteredCities.length}
            </h3>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            name="search"
            placeholder="Search Cities..."
            className="input input-bordered w-full max-w-md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2  w-full text-center overflow-hidden pb-10">
          {filteredCities.map((city, index) => (
            <div key={index} className="col-span-1">
              <Link href={`/cities/${city.name.replace(/\s+/g, "_")}`}>
                <option value={city.name} className="underline">
                  {city.name}
                </option>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
