import React from "react";
import { Building2, History } from "lucide-react";

const CityInfo = ({ cityData }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        {cityData?.name}, Michigan
      </h1>
      <div className="flex justify-center w-full gap-2">
        <div className="tooltip tooltip-bottom" data-tip="City URL">
          {cityData?.website ? (
            <a href={`${cityData.website}`} target="_blank">
              <Building2 />
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip tooltip-bottom" data-tip="WIKI URL">
          {cityData?.wikiUrl ? (
            <a href={`${cityData.wikiUrl}`} target="_blank">
              <img src="/icons/wiki2.png" className="h-6" />
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Historical Site">
          {cityData?.historySite ? (
            <a href={`${cityData.historySite}`} target="_blank">
              <History />
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={`https://www.google.com/maps?q=${cityData?.lat},${cityData?.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-soft btn-primary"
        >
          View on Map
        </a>
      </div>

      <ul className="text-gray-700 space-y-1">
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
        {cityData?.zip?.length > 0 && (
          <li>
            <strong>Zip Codes:</strong>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 ml-2 mt-1 text-gray-700">
              {cityData.zip.map((z, idx) => (
                <div key={idx} className="px-1 text-center">
                  {z}
                </div>
              ))}
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default CityInfo;
