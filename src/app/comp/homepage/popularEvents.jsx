"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PopularEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      try {
        const response = await fetch("/api/events?size=6");
        const data = await response.json();

        if (data.error) {
          console.error("API Error:", data.error);
          setEvents([]);
        } else {
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error("Error fetching popular events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularEvents();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (priceRange) => {
    if (!priceRange) return "Price TBD";
    return `$${priceRange.min}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading popular events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null; // Don't show section if no events
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Events in Michigan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the hottest concerts, sports games, and entertainment
            happening across the Great Lakes State
          </p>
          <Link
            href="/events"
            className="inline-flex items-center mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
          >
            View All Events
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 6).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Event Image */}
              <div className="relative h-48 bg-gray-200">
                {event.images && event.images.length > 0 ? (
                  <Image
                    src={event.images[0].url}
                    alt={event.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Calendar className="w-16 h-16" />
                  </div>
                )}
                {event.status === "onsale" && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    On Sale
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.name}
                </h3>

                {/* Event Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>

                  {event.venue && (
                    <div className="flex items-start text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">{event.venue.name}</div>
                        <div>{event.venue.city}</div>
                      </div>
                    </div>
                  )}

                  {event.priceRange && (
                    <div className="text-sm text-gray-600">
                      From {formatPrice(event.priceRange)}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Get Tickets
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Explore All Michigan Events
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;
