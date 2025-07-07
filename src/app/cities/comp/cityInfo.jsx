'use client'
import React, {useState} from "react";

const CityInfo = ({ cityData }) => {
  const [showAllZips, setShowAllZips] = useState(false);

  const visibleZips = showAllZips ? cityData.zip : cityData.zip.slice(0, 6);

  return (
      <ul className="text-gray-700 space-y-1 max-w-64">
        <li>
          <strong>Type:</strong> {cityData?.place?.toUpperCase()}
        </li>
        {cityData?.county && (
          <li>
            <strong>County:</strong>{" "}
            {Array.isArray(cityData.county)
              ? cityData.county.join("  ") // space-separated
              : cityData.county}
          </li>
        )}
        {cityData?.Population2020 && (
          <li>
            <strong>Population (2020):</strong> {cityData.Population2020}
          </li>
        )}
        {cityData?.Population2010 && (
          <li>
            <strong>Population (2010):</strong> {cityData.Population2010}
          </li>
        )}
        {cityData?.Population2000 && (
          <li>
            <strong>Population (2000):</strong> {cityData.Population2000}
          </li>
        )}
        {cityData?.density && (
          <li>
            <strong>Density:</strong> {cityData.density}
          </li>
        )}
        {cityData?.landAreaSqMi && (
          <li>
            <strong>Land Area:</strong> {cityData.landAreaSqMi} sq mi
          </li>
        )}
        {cityData?.start_date && (
          <li>
            <strong>Founded:</strong> {cityData.start_date}
          </li>
        )}
        {cityData?.sister_cities?.length > 0 && (
          <li>
            <strong>Sister Cities:</strong>
            <ul className="list-disc list-inside ml-2">
              {cityData.sister_cities.map((city, idx) => (
                <li key={idx}>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      city
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        )}
        <li>
          <strong>Zip Codes:</strong>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 ml-2 mt-1 text-gray-700">
            {visibleZips.map((z, idx) => (
              <div key={idx} className="px-1 text-center">
                {z}
              </div>
            ))}
          </div>
        
          {cityData.zip.length > 6 && (
            <button
              onClick={() => setShowAllZips(!showAllZips)}
              className="text-sm text-right w-full pr-10 text-blue-600 mt-2 ml-2 underline focus:outline-none"
            >
              {showAllZips ? "View less" : "View more"}
            </button>
          )}
        </li>
      </ul>
  );
};

export default CityInfo;
