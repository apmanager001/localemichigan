"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import LighthouseMap from "./lighthouseMap";

const LighthousePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [featured, setFeatured] = useState([]);
  const [lighthouseData, setLighthouseData] = useState([]);

  useEffect(() => {
    fetch("/data/lighthouse.json")
      .then((res) => res.json())
      .then((data) => {
        // 🧼 Filter out duplicates by name
        const unique = data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.name === item.name)
        );
        setLighthouseData(unique);
      })
      .catch((err) => console.error("Failed to load lighthouse data:", err));
  }, []);
  
  


  useEffect(() => {
    // Shuffle and pick 3 random lighthouses
    const shuffled = [...lighthouseData].sort(() => 0.5 - Math.random());
    setFeatured(shuffled.slice(0, 3));
  }, [lighthouseData]);

  const filteredNames = lighthouseData.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const validCoordinates = lighthouseData.filter(
    (light) => light.latitude && light.longitude
  );  
  return (
    <section className="bg-base-100 py-16 px-6">
      {/* 🏠 Hero */}
      <div className="relative w-full h-96 mb-12 overflow-hidden rounded-xl shadow-lg">
        <img
          src="/lighthouse/lighthouse.webp"
          alt="Michigan Lighthouse"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Michigan Lighthouses</h1>
          <p className="text-lg max-w-xl">
            From the shores of Lake Superior to the tip of Lake Erie, discover
            the beacons that guide Michigan’s maritime heritage.
          </p>
        </div>
      </div>

      {/* 🌟 Featured Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {featured.map((light) => (
          <div
            key={light.name}
            className="card bg-base-200 shadow-md hover:shadow-xl transition duration-200"
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-secondary">{light.name}</h2>
              <p className="text-sm">
                Operated by: {light.operator || "Unknown"}
              </p>
              {light.website && (
                <Link
                  href={light.website}
                  target="_blank"
                  className="btn btn-link btn-sm mt-2"
                >
                  Website
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 Search + Name List */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-around mx-auto text-center ">
        <LighthouseMap coordinates={validCoordinates} />
        <div>
          <div className="flex items-center justify-between mb-6">
            <label className="input input-bordered flex items-center justify-between gap-2">
              <Search size={20} />
              <input
                type="text"
                id="search"
                className="grow"
                placeholder="Search lighthouses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <div className="text-gra</div>y-500 text-md">
              <span className="text-gray-600 text-sm">Total: </span>
              {lighthouseData.length}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {filteredNames.map((entry) => (
              <Link
                key={entry.name}
                href={`/lighthouses/${entry.name
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`}
                className="btn btn-soft btn-primary text-sm max-w-64"
              >
                {entry.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LighthousePage;
