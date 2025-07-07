"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import LighthouseMap from '../../lighthouses/comp/lighthouseMap'

const LakesPage = () => {
  const [lakesData, setLakesData] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    fetch("/data/lakes.json") // make sure this file exists in public/data/
      .then((res) => res.json())
      .then((data) => {
        const unique = data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.name === item.name)
        );
        setLakesData(unique);
        const shuffled = [...unique].sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 3));
      })
      .catch((err) => console.error("Failed to load lake data:", err));
  }, []);

  const filteredNames = lakesData.filter((entry) =>
    entry.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const visibleList = searchTerm
    ? filteredNames
    : filteredNames.slice(0, visibleCount);
  const validCoordinates = visibleList.filter(
    (light) => light.latitude && light.longitude
  ); 
  return (
    <section className="bg-base-100 py-16 px-6">
      {/* 🌊 Hero Banner */}
      <div className="relative w-full h-[400px] mb-12 overflow-hidden rounded-xl shadow-lg">
        <img
          src="/lighthouse/lakes.webp" // Update path to your lake banner image
          alt="Michigan Lakes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Michigan Lakes</h1>
          <p className="text-lg max-w-xl">
            Dive into Michigan’s serene waterscapes, from vast Great Lakes to
            secret inland gems.
          </p>
        </div>
      </div>

      {/* 🌟 Featured Lakes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {featured.map((lake) => (
          <div
            key={lake.name}
            className="card bg-base-200 shadow-md hover:shadow-xl transition duration-200"
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-info">{lake.name}</h2>
              <p className="text-sm">
                Region: {lake.region || lake.county || "—"}
              </p>
              {lake.website && (
                <Link
                  href={lake.website}
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
            <label className="input input-bordered flex items-center gap-2">
              <Search size={20} />
              <input
                type="text"
                id="search"
                className="grow"
                placeholder="Search lakes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <div className="text-gray-500 text-md">
              <span className="text-gray-600 text-sm">Total: </span>
              {lakesData.length}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {visibleList.map((entry) => (
              <Link
                key={entry.name}
                href={`/lakes/${entry.name.toLowerCase().replace(/\s+/g, "_")}`}
                className="btn btn-soft btn-info text-sm max-w-64"
              >
                {entry.name}
              </Link>
            ))}
          </div>

          {!searchTerm && filteredNames.length > visibleCount && (
            <button
              className="btn btn-outline btn-info mt-6"
              onClick={() => setVisibleCount(lakesData.length)}
            >
              View More Lakes
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default LakesPage;
