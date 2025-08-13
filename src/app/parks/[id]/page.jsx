"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Mountain, Info, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/app/comp/LocationMap"), {
  ssr: false,
});

const ParkDetailPage = () => {
  const params = useParams();
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch("/data/park.json")
        .then((r) => r.json())
        .then((data) => {
          const match = data.find(
            (item) =>
              item.name?.toLowerCase().replace(/\s+/g, "_") === params.id
          );
          setPark(match || null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading park...</p>
        </div>
      </div>
    );
  }

  if (!park) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Park Not Found
          </h1>
          <Link
            href="/parks"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Parks
          </Link>
        </div>
      </div>
    );
  }

  const fullAddress = [
    park.address_number,
    park.address_street,
    park.address_city,
    park.address_state,
    park.address_zipcode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/parks"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Parks
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[260px] flex items-center overflow-hidden">
        {park.heroImage && (
          <img
            src={park.heroImage}
            alt={`${park.name}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        {!park.heroImage && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{park.name}</h1>
            {park.address_city && (
              <p className="text-white/90 mt-2">
                {park.address_city}, Michigan
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-3 text-green-500" /> About {park.name}
            </h2>
            <div className="space-y-5">
              {park.leisure && (
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="text-gray-800">{park.leisure}</p>
                </div>
              )}
              {park.operator && (
                <div>
                  <span className="text-sm text-gray-500">Operator</span>
                  <p className="text-gray-800">{park.operator}</p>
                </div>
              )}
              {park.opening_hours && (
                <div>
                  <span className="text-sm text-gray-500">Hours</span>
                  <p className="text-gray-800 whitespace-pre-line">
                    {park.opening_hours}
                  </p>
                </div>
              )}
              {park.website && (
                <div>
                  <Link
                    href={park.website}
                    target="_blank"
                    className="inline-flex items-center px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> Visit Website
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <LocationMap
              coordinate={{
                latitude:
                  typeof park.latitude === "number" ? park.latitude : undefined,
                longitude:
                  typeof park.longitude === "number"
                    ? park.longitude
                    : undefined,
                name: park.name,
              }}
              heightClass="h-80"
              zoom={13}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-500" /> Details
            </h3>
            <div className="space-y-4">
              {fullAddress && (
                <div>
                  <span className="text-sm text-gray-500">Address</span>
                  <p className="text-gray-800">{fullAddress}</p>
                </div>
              )}
              {typeof park.latitude === "number" &&
                typeof park.longitude === "number" && (
                  <div>
                    <span className="text-sm text-gray-500">Coordinates</span>
                    <p className="text-gray-800 text-sm">
                      {park.latitude}, {park.longitude}
                    </p>
                  </div>
                )}
              {park.elevation && (
                <div>
                  <span className="text-sm text-gray-500">Elevation</span>
                  <p className="text-gray-800">{park.elevation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetailPage;
