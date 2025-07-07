'use client'
import Link from 'next/link'
import React from 'react'

const TopCities = () => {
    const cities = [
      "Detroit",
      "Grand Rapids",
      "Dearborn",
      "Traverse City",
      "Marquette",
      "Lansing",
      "Cadillac",
      "Kalamazoo",
      "Gaylord",
      "Flint",
    ];
    const formatCitySlug = (city) => city.toLowerCase().replace(/\s+/g, "_");
        
  return (
    <section className="bg-base-200 py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Explore Michigan's Top Cities
      </h1>
      <p className="text-lg mb-8 text-base-content">
        Discover local businesses, attractions, and services in the most vibrant
        cities across Michigan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:mx-24">
        {cities.map((city) => (
          <Link key={city} href={`/cities/${formatCitySlug(city)}`}>
            <div className="btn btn-soft btn-primary rounded-full w-48 hover:scale-105 transition-transform duration-200">
              {city}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TopCities