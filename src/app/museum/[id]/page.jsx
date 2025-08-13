"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Info,
  ExternalLink,
  Phone,
} from "lucide-react";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/app/comp/LocationMap"), {
  ssr: false,
});

const MuseumDetailPage = () => {
  const params = useParams();
  const [museum, setMuseum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch("/data/museum.json")
        .then((r) => r.json())
        .then((data) => {
          const id = String(params.id);
          const match = data.find((item) => {
            const nameSlug = item.name?.toLowerCase().replace(/\s+/g, "_");
            return item.slug === id || nameSlug === id;
          });
          setMuseum(match || null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading museum...</p>
        </div>
      </div>
    );
  }

  if (!museum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Museum Not Found
          </h1>
          <Link
            href="/museum"
            className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Museums
          </Link>
        </div>
      </div>
    );
  }

  const wikipediaTitle = museum.wikipedia?.replace(/^en:/, "");
  const wikipediaUrl = wikipediaTitle
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaTitle)}`
    : null;

  const fullAddress = [
    museum.address_number,
    museum.address_street,
    museum.address_city,
    museum.address_state,
    museum.address_zipcode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO: JSON-LD for Museum */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Museum",
            name: museum.name,
            description: museum.description || undefined,
            url:
              typeof window !== "undefined" ? window.location.href : undefined,
            image: museum.heroImage || undefined,
            sameAs: wikipediaUrl || undefined,
            telephone: museum.phone || undefined,
            address:
              museum.address_city || museum.address_street
                ? {
                    "@type": "PostalAddress",
                    streetAddress:
                      [museum.address_number, museum.address_street]
                        .filter(Boolean)
                        .join(" ") || undefined,
                    addressLocality: museum.address_city || undefined,
                    addressRegion: museum.address_state || undefined,
                    postalCode: museum.address_zipcode || undefined,
                    addressCountry: "US",
                  }
                : undefined,
            geo:
              typeof museum.latitude === "number" &&
              typeof museum.longitude === "number"
                ? {
                    "@type": "GeoCoordinates",
                    latitude: museum.latitude,
                    longitude: museum.longitude,
                  }
                : undefined,
            openingHours: museum.opening_hours || undefined,
          }),
        }}
      />
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/museum"
            className="inline-flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Museums
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[260px] flex items-center overflow-hidden">
        {museum.heroImage && (
          <img
            src={museum.heroImage}
            alt={`${museum.name}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        {!museum.heroImage && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500" />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{museum.name}</h1>
            {museum.address_city && (
              <p className="text-white/90 mt-2">
                {museum.address_city}, Michigan
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-3 text-purple-500" /> About{" "}
              {museum.name}
            </h2>
            <div className="space-y-5">
              {museum.description && (
                <div>
                  <span className="text-sm text-gray-500">About</span>
                  <p className="text-gray-800">{museum.description}</p>
                </div>
              )}
              {(museum.museum || museum.museumType) && (
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="text-gray-800">
                    {museum.museum || museum.museumType}
                  </p>
                </div>
              )}
              {museum.established && (
                <div>
                  <span className="text-sm text-gray-500">Established</span>
                  <p className="text-gray-800">{museum.established}</p>
                </div>
              )}
              {museum.opening_hours && (
                <div>
                  <span className="text-sm text-gray-500">Hours</span>
                  <p className="text-gray-800 whitespace-pre-line">
                    {museum.opening_hours}
                  </p>
                </div>
              )}
              {museum.operator && (
                <div>
                  <span className="text-sm text-gray-500">Operator</span>
                  <p className="text-gray-800">{museum.operator}</p>
                </div>
              )}
              {museum.collectionSize && (
                <div>
                  <span className="text-sm text-gray-500">Collection size</span>
                  <p className="text-gray-800">{museum.collectionSize}</p>
                </div>
              )}
              {museum.visitors && (
                <div>
                  <span className="text-sm text-gray-500">Visitors</span>
                  <p className="text-gray-800">{museum.visitors}</p>
                </div>
              )}
              {museum.director && (
                <div>
                  <span className="text-sm text-gray-500">Director</span>
                  <p className="text-gray-800">{museum.director}</p>
                </div>
              )}
              {museum.publicTransit && (
                <div>
                  <span className="text-sm text-gray-500">Public transit</span>
                  <p className="text-gray-800">{museum.publicTransit}</p>
                </div>
              )}
              {museum.wikipedia && (
                <div>
                  <span className="text-sm text-gray-500">Wikipedia</span>
                  <p>
                    <Link
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                        museum.wikipedia.replace(/^en:/, "")
                      )}`}
                      target="_blank"
                      className="text-purple-600 hover:underline"
                    >
                      View article
                    </Link>
                  </p>
                </div>
              )}
              {museum.website && (
                <div>
                  <Link
                    href={museum.website}
                    target="_blank"
                    className="inline-flex items-center px-5 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> Visit Website
                  </Link>
                </div>
              )}
              {museum.email && (
                <div>
                  <span className="text-sm text-gray-500">Email</span>
                  <p>
                    <a
                      href={`mailto:${museum.email}`}
                      className="text-purple-600 hover:underline"
                    >
                      {museum.email}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <LocationMap
              coordinate={{
                latitude:
                  typeof museum.latitude === "number"
                    ? museum.latitude
                    : undefined,
                longitude:
                  typeof museum.longitude === "number"
                    ? museum.longitude
                    : undefined,
                name: museum.name,
              }}
              heightClass="h-80"
              zoom={13}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-500" /> Details
            </h3>
            <div className="space-y-4">
              {fullAddress && (
                <div>
                  <span className="text-sm text-gray-500">Address</span>
                  <p className="text-gray-800">{fullAddress}</p>
                </div>
              )}
              {typeof museum.latitude === "number" &&
                typeof museum.longitude === "number" && (
                  <div>
                    <span className="text-sm text-gray-500">Coordinates</span>
                    <p className="text-gray-800 text-sm">
                      {museum.latitude}, {museum.longitude}
                    </p>
                  </div>
                )}
              {museum.coordinatesDms && (
                <div>
                  <span className="text-sm text-gray-500">
                    Coordinates (DMS)
                  </span>
                  <p className="text-gray-800 text-sm">
                    {museum.coordinatesDms}
                  </p>
                </div>
              )}
              {museum.built && (
                <div>
                  <span className="text-sm text-gray-500">Built</span>
                  <p className="text-gray-800">{museum.built}</p>
                </div>
              )}
              {museum.architect && (
                <div>
                  <span className="text-sm text-gray-500">Architect</span>
                  <p className="text-gray-800">{museum.architect}</p>
                </div>
              )}
              {museum.architecturalStyle && (
                <div>
                  <span className="text-sm text-gray-500">
                    Architectural style
                  </span>
                  <p className="text-gray-800">{museum.architecturalStyle}</p>
                </div>
              )}
              {museum.restored && (
                <div>
                  <span className="text-sm text-gray-500">Restored</span>
                  <p className="text-gray-800">{museum.restored}</p>
                </div>
              )}
              {museum.restoredBy && (
                <div>
                  <span className="text-sm text-gray-500">Restored by</span>
                  <p className="text-gray-800">{museum.restoredBy}</p>
                </div>
              )}
              {museum.partOf && (
                <div>
                  <span className="text-sm text-gray-500">Part of</span>
                  <p className="text-gray-800">{museum.partOf}</p>
                </div>
              )}
              {museum.designatedCp && (
                <div>
                  <span className="text-sm text-gray-500">Designated CP</span>
                  <p className="text-gray-800">{museum.designatedCp}</p>
                </div>
              )}
              {museum.phone && (
                <div className="flex items-center gap-2 text-gray-800">
                  <Phone className="w-4 h-4 text-purple-500" /> {museum.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumDetailPage;
