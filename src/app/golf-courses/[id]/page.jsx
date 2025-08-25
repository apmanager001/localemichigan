"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  LandPlot,
  Info,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Navigation,
} from "lucide-react";
import dynamic from "next/dynamic";
import Map from '../../lighthouses/comp/lighthouseMap'

const LocationMap = dynamic(() => import("@/app/comp/LocationMap"), {
  ssr: false,
});

const GolfCourseDetailPage = () => {
  const params = useParams();
  const [golfCourse, setGolfCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch("/data/golfCourse.json")
        .then((r) => r.json())
        .then((data) => {
          const id = String(params.id);
          const match = data.find((item) => {
            const nameSlug = item.name?.toLowerCase().replace(/\s+/g, "_");
            return item.slug === id || nameSlug === id;
          });
          setGolfCourse(match || null);
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
          <p className="mt-4 text-gray-600">Loading golf course...</p>
        </div>
      </div>
    );
  }

  if (!golfCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Golf Course Not Found
          </h1>
          <Link
            href="/golf-courses"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Golf Courses
          </Link>
        </div>
      </div>
    );
  }

  const fullAddress = [
    golfCourse.addressNumber,
    golfCourse.address,
    golfCourse.nearestCity,
    golfCourse.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO: JSON-LD for Golf Course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GolfCourse",
            name: golfCourse.name,
            description: golfCourse.description || undefined,
            url:
              typeof window !== "undefined" ? window.location.href : undefined,
            telephone: golfCourse.phone || undefined,
            email: golfCourse.email || undefined,
            address: fullAddress
              ? {
                  "@type": "PostalAddress",
                  streetAddress: golfCourse.address || undefined,
                  addressLocality: golfCourse.nearestCity || undefined,
                  postalCode: golfCourse.zipCode || undefined,
                  addressCountry: "US",
                }
              : undefined,
            geo:
              golfCourse.latitude && golfCourse.longitude
                ? {
                    "@type": "GeoCoordinates",
                    latitude: golfCourse.latitude,
                    longitude: golfCourse.longitude,
                  }
                : undefined,
            sameAs: golfCourse.website || undefined,
          }),
        }}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/golf-courses"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Golf Courses
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            {/* Title and Basic Info */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {golfCourse.name}
                  </h1>
                  {golfCourse.nearestCity && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 mr-2 text-green-500" />
                      <span>{golfCourse.nearestCity}</span>
                    </div>
                  )}
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <LandPlot className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Description */}
              {golfCourse.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-green-500" />
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {golfCourse.description}
                  </p>
                </div>
              )}

              {/* Note */}
              {golfCourse.note && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-green-500" />
                    Additional Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    {golfCourse.note}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {golfCourse.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${golfCourse.phone}`}
                        className="text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {golfCourse.phone}
                      </a>
                    </div>
                  </div>
                )}

                {golfCourse.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${golfCourse.email}`}
                        className="text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {golfCourse.email}
                      </a>
                    </div>
                  </div>
                )}

                {golfCourse.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={golfCourse.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-green-600 transition-colors flex items-center"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                )}

                {golfCourse.operator && (
                  <div className="flex items-center">
                    <LandPlot className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Operator</p>
                      <p className="text-gray-900">{golfCourse.operator}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            {golfCourse.latitude && golfCourse.longitude && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  Location
                </h2>
                <div className="h-96 rounded-lg overflow-hidden">
                  <Map
                    coordinates={[
                      {
                        latitude: golfCourse.latitude,
                        longitude: golfCourse.longitude,
                        name: golfCourse.name,
                      },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-green-500" />
                Quick Info
              </h3>

              <div className="space-y-4">
                {golfCourse.coordinatesDms && (
                  <div>
                    <p className="text-sm text-gray-500">Coordinates</p>
                    <p className="text-sm text-gray-900 font-mono">
                      {golfCourse.coordinatesDms}
                    </p>
                  </div>
                )}

                {golfCourse.elementType && (
                  <div>
                    <p className="text-sm text-gray-500">Data Source</p>
                    <p className="text-sm text-gray-900 capitalize">
                      {golfCourse.elementType}
                    </p>
                  </div>
                )}

                {fullAddress && (
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm text-gray-900">{fullAddress}</p>
                  </div>
                )}

                {/* Directions Button */}
                {golfCourse.latitude && golfCourse.longitude && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${golfCourse.latitude},${golfCourse.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GolfCourseDetailPage;
