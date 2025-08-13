"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Lightbulb, Info, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/app/comp/LocationMap"), {
  ssr: false,
});

const LighthousePage = () => {
  const params = useParams();
  const [lighthouseData, setLighthouseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch("/data/lighthouse.json")
        .then((res) => res.json())
        .then((data) => {
          const id = String(params.id);
          const lighthouse = data.find((item) => {
            const nameSlug = item.name?.toLowerCase().replace(/\s+/g, "_");
            return item.slug === id || nameSlug === id;
          });
          setLighthouseData(lighthouse);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load lighthouse data:", err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading lighthouse information...
          </p>
        </div>
      </div>
    );
  }

  if (!lighthouseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Lighthouse Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The lighthouse you're looking for doesn't exist.
          </p>
          <Link
            href="/lighthouses"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lighthouses
          </Link>
        </div>
      </div>
    );
  }

  const wikipediaTitle = lighthouseData.wikipedia?.replace(/^en:/, "");
  const wikipediaUrl = wikipediaTitle
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaTitle)}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO: JSON-LD for Lighthouse as TouristAttraction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: lighthouseData.name,
            description: lighthouseData.description || undefined,
            url:
              typeof window !== "undefined" ? window.location.href : undefined,
            image: lighthouseData.heroImage || undefined,
            sameAs: wikipediaUrl || undefined,
            geo:
              typeof lighthouseData.latitude === "number" &&
              typeof lighthouseData.longitude === "number"
                ? {
                    "@type": "GeoCoordinates",
                    latitude: lighthouseData.latitude,
                    longitude: lighthouseData.longitude,
                  }
                : undefined,
          }),
        }}
      />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/lighthouses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lighthouses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {lighthouseData.heroImage && (
          <img
            src={lighthouseData.heroImage}
            alt={`${lighthouseData.name}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        {!lighthouseData.heroImage && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600"></div>
          </>
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {lighthouseData.name}
            </h1>
            {lighthouseData.location && (
              <p className="text-xl text-white/90">{lighthouseData.location}</p>
            )}
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
                <Info className="w-6 h-6 mr-3 text-blue-500" />
                About {lighthouseData.name}
              </h2>

              <div className="space-y-6">
                {lighthouseData.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lighthouseData.description}
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
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Wikipedia
                    </Link>
                  </div>
                )}

                {lighthouseData.history && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      History
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lighthouseData.history}
                    </p>
                  </div>
                )}

                {lighthouseData.characteristics && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Light Characteristics
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lighthouseData.characteristics}
                    </p>
                  </div>
                )}

                {lighthouseData.website && (
                  <div className="pt-4">
                    <Link
                      href={lighthouseData.website}
                      target="_blank"
                      className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
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
                    typeof lighthouseData.latitude === "number"
                      ? lighthouseData.latitude
                      : undefined,
                  longitude:
                    typeof lighthouseData.longitude === "number"
                      ? lighthouseData.longitude
                      : undefined,
                  name: lighthouseData.name,
                }}
                heightClass="h-80"
                zoom={11}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                Lighthouse Details
              </h3>

              <div className="space-y-4">
                {lighthouseData.location && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Location
                    </span>
                    <p className="text-gray-800">{lighthouseData.location}</p>
                  </div>
                )}

                {lighthouseData.operator && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Operator
                    </span>
                    <p className="text-gray-800">{lighthouseData.operator}</p>
                  </div>
                )}

                {lighthouseData.yearBuilt && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Year Built
                    </span>
                    <p className="text-gray-800">{lighthouseData.yearBuilt}</p>
                  </div>
                )}

                {lighthouseData.automatedYear && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Automated
                    </span>
                    <p className="text-gray-800">
                      {lighthouseData.automatedYear}
                    </p>
                  </div>
                )}

                {lighthouseData.height && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Height
                    </span>
                    <p className="text-gray-800">{lighthouseData.height}</p>
                  </div>
                )}
                {typeof lighthouseData.heightM === "number" &&
                  !lighthouseData.height && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Height
                      </span>
                      <p className="text-gray-800">
                        {lighthouseData.heightM} m
                      </p>
                    </div>
                  )}

                {lighthouseData.focalHeight && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Focal Height
                    </span>
                    <p className="text-gray-800">
                      {lighthouseData.focalHeight}
                    </p>
                  </div>
                )}
                {typeof lighthouseData.focalHeightM === "number" &&
                  !lighthouseData.focalHeight && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Focal Height
                      </span>
                      <p className="text-gray-800">
                        {lighthouseData.focalHeightM} m
                      </p>
                    </div>
                  )}

                {lighthouseData.range && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Range
                    </span>
                    <p className="text-gray-800">{lighthouseData.range}</p>
                  </div>
                )}
                {typeof lighthouseData.rangeKm === "number" &&
                  !lighthouseData.range && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Range
                      </span>
                      <p className="text-gray-800">
                        {lighthouseData.rangeKm} km
                      </p>
                    </div>
                  )}

                {lighthouseData.lens && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Lens
                    </span>
                    <p className="text-gray-800">{lighthouseData.lens}</p>
                  </div>
                )}

                {lighthouseData.construction && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Construction
                    </span>
                    <p className="text-gray-800">
                      {lighthouseData.construction}
                    </p>
                  </div>
                )}
                {lighthouseData.marking && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Marking
                    </span>
                    <p className="text-gray-800">{lighthouseData.marking}</p>
                  </div>
                )}

                {lighthouseData.deactivatedYear && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Deactivated
                    </span>
                    <p className="text-gray-800">
                      {lighthouseData.deactivatedYear}
                    </p>
                  </div>
                )}

                {lighthouseData.status && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Status
                    </span>
                    <p className="text-gray-800">{lighthouseData.status}</p>
                  </div>
                )}

                {typeof lighthouseData.latitude === "number" &&
                  typeof lighthouseData.longitude === "number" && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Coordinates
                      </span>
                      <p className="text-gray-800 text-sm">
                        {lighthouseData.latitude}, {lighthouseData.longitude}
                      </p>
                    </div>
                  )}

                {lighthouseData.coordinatesDms && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Coordinates (DMS)
                    </span>
                    <p className="text-gray-800 text-sm">
                      {lighthouseData.coordinatesDms}
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

export default LighthousePage;
