"use client";
import React, { useState } from "react";
import { MapPin, Users, Calendar, Ruler, Building, Globe } from "lucide-react";

const CityInfo = ({ cityData }) => {
  const [showAllZips, setShowAllZips] = useState(false);

  const visibleZips = showAllZips ? cityData.zip : cityData.zip.slice(0, 6);

  const InfoItem = ({ icon: Icon, label, value, className = "" }) => {
    if (!value) return null;
    return (
      <div
        className={`flex items-start space-x-3 p-3 bg-gray-50 rounded-lg ${className}`}
      >
        <Icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-gray-800 font-semibold">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <InfoItem
        icon={Building}
        label="Type"
        value={cityData?.place?.toUpperCase()}
      />

      <InfoItem
        icon={MapPin}
        label="County"
        value={
          Array.isArray(cityData.county)
            ? cityData.county.join(", ")
            : cityData.county
        }
      />

      <InfoItem
        icon={Users}
        label="Population (2020)"
        value={
          cityData?.Population2020
            ? `${cityData.Population2020.toLocaleString()}`
            : null
        }
      />

      <InfoItem
        icon={Users}
        label="Population (2010)"
        value={
          cityData?.Population2010
            ? `${cityData.Population2010.toLocaleString()}`
            : null
        }
      />

      <InfoItem
        icon={Users}
        label="Population (2000)"
        value={
          cityData?.Population2000
            ? `${cityData.Population2000.toLocaleString()}`
            : null
        }
      />

      <InfoItem
        icon={Users}
        label="Population Density"
        value={cityData?.density ? `${cityData.density} people/sq mi` : null}
      />

      <InfoItem
        icon={Ruler}
        label="Land Area"
        value={cityData?.landAreaSqMi ? `${cityData.landAreaSqMi} sq mi` : null}
      />

      <InfoItem icon={Calendar} label="Founded" value={cityData?.start_date} />

      {/* Sister Cities */}
      {cityData?.sister_cities?.length > 0 && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium mb-2">
                Sister Cities
              </p>
              <div className="space-y-1">
                {cityData.sister_cities.map((city, idx) => (
                  <a
                    key={idx}
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      city
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    {city}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zip Codes */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium mb-2">Zip Codes</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {visibleZips.map((zip, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-white rounded-md text-center text-sm font-medium text-gray-700 border border-gray-200"
                >
                  {zip}
                </div>
              ))}
            </div>

            {cityData.zip.length > 6 && (
              <button
                onClick={() => setShowAllZips(!showAllZips)}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
              >
                {showAllZips
                  ? "Show less"
                  : `Show ${cityData.zip.length - 6} more`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInfo;
