"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Waves, Info, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/app/comp/LocationMap"), {
  ssr: false,
});

const LakePage = () => {
  const params = useParams();
  const [lakeData, setLakeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch("/data/lakes.json")
        .then((res) => res.json())
        .then((data) => {
          const id = String(params.id);
          const match = data.find((item) => {
            const nameSlug = item.name?.toLowerCase().replace(/\s+/g, "_");
            return item.slug === id || nameSlug === id;
          });
          setLakeData(match || null);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load lake data:", err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lake information...</p>
        </div>
      </div>
    );
  }

  if (!lakeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Lake Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The lake you're looking for doesn't exist.
          </p>
          <Link
            href="/lakes"
            className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lakes
          </Link>
        </div>
      </div>
    );
  }

  const wikipediaTitle = lakeData.wikipedia?.replace(/^en:/, "");
  const wikipediaUrl = wikipediaTitle
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaTitle)}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LakeBodyOfWater",
    name: lakeData.name,
    description: lakeData.description || undefined,
    url: typeof window !== "undefined" ? window.location.href : undefined,
    image: lakeData.heroImage || undefined,
    sameAs: wikipediaUrl || undefined,
    geo:
      typeof lakeData.latitude === "number" &&
      typeof lakeData.longitude === "number"
        ? {
            "@type": "GeoCoordinates",
            latitude: lakeData.latitude,
            longitude: lakeData.longitude,
          }
        : undefined,
    area:
      lakeData.area ||
      (typeof lakeData.areaSqKm === "number"
        ? `${lakeData.areaSqKm} km2`
        : undefined),
    maximumDepth:
      lakeData.maxDepth ||
      (typeof lakeData.maxDepthM === "number"
        ? `${lakeData.maxDepthM} m`
        : undefined),
    isAccessibleForFree: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO: JSON-LD for Lake */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/lakes"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lakes
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {lakeData.heroImage && (
          <img
            src={lakeData.heroImage}
            alt={`${lakeData.name}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        {!lakeData.heroImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600"></div>
        )}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <Waves className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {lakeData.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-3 text-cyan-500" />
                About {lakeData.name}
              </h2>

              <div className="space-y-6">
                {lakeData.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lakeData.description}
                    </p>
                  </div>
                )}

                {wikipediaUrl && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      More information
                    </h3>
                    <Link
                      href={wikipediaUrl}
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Wikipedia
                    </Link>
                  </div>
                )}

                {lakeData.trophicStatus && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Trophic status
                    </h3>
                    <p className="text-gray-700">{lakeData.trophicStatus}</p>
                  </div>
                )}

                {(lakeData.inflows?.length || lakeData.outflows?.length) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Hydrology
                    </h3>
                    {lakeData.inflows?.length > 0 && (
                      <p className="text-gray-700">
                        <span className="font-medium">Primary inflows:</span>{" "}
                        {lakeData.inflows.join(", ")}
                      </p>
                    )}
                    {lakeData.outflows?.length > 0 && (
                      <p className="text-gray-700">
                        <span className="font-medium">Primary outflows:</span>{" "}
                        {lakeData.outflows.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                {lakeData.basinCountries?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Basin countries
                    </h3>
                    <p className="text-gray-700">
                      {lakeData.basinCountries.join(", ")}
                    </p>
                  </div>
                )}

                {lakeData.settlements?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Nearby settlements
                    </h3>
                    <p className="text-gray-700">
                      {lakeData.settlements.join(", ")}
                    </p>
                  </div>
                )}

                {lakeData.activities && lakeData.activities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Activities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {lakeData.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {lakeData.fish && lakeData.fish.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Fish Species
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {lakeData.fish.map((fish, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {fish}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {lakeData.website && (
                  <div className="pt-2">
                    <Link
                      href={lakeData.website}
                      target="_blank"
                      className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Official Website
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <LocationMap
                coordinate={{
                  latitude:
                    typeof lakeData.latitude === "number"
                      ? lakeData.latitude
                      : undefined,
                  longitude:
                    typeof lakeData.longitude === "number"
                      ? lakeData.longitude
                      : undefined,
                  name: lakeData.name,
                }}
                heightClass="h-80"
                zoom={10}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                Lake Details
              </h3>

              <div className="space-y-4">
                {lakeData.location && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Location
                    </span>
                    <p className="text-gray-800">{lakeData.location}</p>
                  </div>
                )}

                {typeof lakeData.latitude === "number" &&
                  typeof lakeData.longitude === "number" && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Coordinates
                      </span>
                      <p className="text-gray-800 text-sm">
                        {lakeData.latitude}, {lakeData.longitude}
                      </p>
                    </div>
                  )}

                {lakeData.coordinatesDms && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Coordinates (DMS)
                    </span>
                    <p className="text-gray-800 text-sm">
                      {lakeData.coordinatesDms}
                    </p>
                  </div>
                )}

                {lakeData.area && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Surface Area
                    </span>
                    <p className="text-gray-800">{lakeData.area}</p>
                  </div>
                )}
                {typeof lakeData.areaSqKm === "number" && !lakeData.area && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Surface Area
                    </span>
                    <p className="text-gray-800">{lakeData.areaSqKm} km²</p>
                  </div>
                )}

                {lakeData.meanDepth && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Average Depth
                    </span>
                    <p className="text-gray-800">{lakeData.meanDepth}</p>
                  </div>
                )}
                {typeof lakeData.meanDepthM === "number" &&
                  !lakeData.meanDepth && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Average Depth
                      </span>
                      <p className="text-gray-800">{lakeData.meanDepthM} m</p>
                    </div>
                  )}

                {lakeData.maxDepth && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Max Depth
                    </span>
                    <p className="text-gray-800">{lakeData.maxDepth}</p>
                  </div>
                )}
                {typeof lakeData.maxDepthM === "number" &&
                  !lakeData.maxDepth && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Max Depth
                      </span>
                      <p className="text-gray-800">{lakeData.maxDepthM} m</p>
                    </div>
                  )}

                {lakeData.maxLength && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Max Length
                    </span>
                    <p className="text-gray-800">{lakeData.maxLength}</p>
                  </div>
                )}
                {typeof lakeData.maxLengthKm === "number" &&
                  !lakeData.maxLength && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Max Length
                      </span>
                      <p className="text-gray-800">{lakeData.maxLengthKm} km</p>
                    </div>
                  )}

                {lakeData.maxWidth && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Max Width
                    </span>
                    <p className="text-gray-800">{lakeData.maxWidth}</p>
                  </div>
                )}
                {typeof lakeData.maxWidthKm === "number" &&
                  !lakeData.maxWidth && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Max Width
                      </span>
                      <p className="text-gray-800">{lakeData.maxWidthKm} km</p>
                    </div>
                  )}

                {lakeData.residenceTime && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Residence Time
                    </span>
                    <p className="text-gray-800">{lakeData.residenceTime}</p>
                  </div>
                )}

                {typeof lakeData.elevationM === "number" && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Elevation
                    </span>
                    <p className="text-gray-800">{lakeData.elevationM} m</p>
                  </div>
                )}

                {typeof lakeData.shorelineLengthKm === "number" && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Shoreline Length
                    </span>
                    <p className="text-gray-800">
                      {lakeData.shorelineLengthKm} km
                    </p>
                  </div>
                )}

                {lakeData.managingAgency && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Managing Agency
                    </span>
                    <p className="text-gray-800">{lakeData.managingAgency}</p>
                  </div>
                )}
                {lakeData.lastUpdated && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Last Updated
                    </span>
                    <p className="text-gray-800 text-sm">
                      {lakeData.lastUpdated}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LakePage;
