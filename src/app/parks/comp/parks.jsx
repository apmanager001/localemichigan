"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import parkImage from "../images/park.webp";
import { Search, Mountain, MapPin, Trees } from "lucide-react";
import LighthouseMap from "../../lighthouses/comp/lighthouseMap";

const ParksPage = () => {
  const [parksData, setParksData] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    fetch("/data/park.json")
      .then((res) => res.json())
      .then((data) => {
        const unique = data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.name === item.name)
        );
        setParksData(unique);
        const shuffled = [...unique].sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 3));
      })
      .catch((err) => console.error("Failed to load park data:", err));
  }, []);

  const filteredNames = parksData.filter((entry) =>
    entry.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleList = searchTerm
    ? filteredNames
    : filteredNames.slice(0, visibleCount);
  const validCoordinates = visibleList.filter(
    (light) => light.latitude && light.longitude
  );

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image
          src={parkImage}
          alt="Michigan Parks"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-800/40 to-green-900/70"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Michigan Parks
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Explore the trails, lakes, and scenic beauty of Michigan's outdoor
              playgrounds.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Stats Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {parksData.length}
                </div>
                <div className="text-sm text-gray-500">Total Parks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {filteredNames.length}
                </div>
                <div className="text-sm text-gray-500">Showing</div>
              </div>
            </div>
          </div>

          {/* Featured Parks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featured.map((park) => (
              <div
                key={park.name}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {park.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {park.city || park.county || "Location TBD"}
                  </p>
                  {park.website && (
                    <Link
                      href={park.website}
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      Visit Website
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Search and Map Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  Park Locations
                </h3>
                <LighthouseMap coordinates={validCoordinates} />
              </div>
            </div>

            {/* Search and List */}
            <div className="order-1 lg:order-2">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search for a park..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm transition-all duration-200"
                  />
                </div>
                {searchTerm && (
                  <div className="mt-2 text-sm text-gray-500">
                    {filteredNames.length === 0 ? (
                      <span className="text-red-500">
                        No parks found matching "{searchTerm}"
                      </span>
                    ) : (
                      <span>Found {filteredNames.length} parks</span>
                    )}
                  </div>
                )}
              </div>

              {/* Park List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleList.map((entry) => (
                  <Link
                    key={entry.name}
                    href={`/parks/${entry.name
                      .toLowerCase()
                      .replace(/\s+/g, "_")}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-green-300 hover:bg-green-50">
                      <div className="flex items-center">
                        <Mountain className="w-4 h-4 text-green-500 mr-3 group-hover:text-green-600 transition-colors" />
                        <span className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                          {entry.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {!searchTerm && filteredNames.length > visibleCount && (
                <button
                  className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setVisibleCount(parksData.length)}
                >
                  View All Parks
                </button>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Discover Michigan's natural beauty through state parks, national
              parks, and recreation areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParksPage;
