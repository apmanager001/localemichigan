"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("Detroit");
  const [searchKeyword, setSearchKeyword] = useState("All Events");
  const [timeframe, setTimeframe] = useState("1month");
  const [resultsPerPage, setResultsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("mostRecent");
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const michiganCities = [
    "All",
    "Detroit",
    "Grand Rapids",
    "Ann Arbor",
    "Lansing",
    "Flint",
    "Traverse City",
    "Kalamazoo",
    "Saginaw",
    "Warren",
    "Sterling Heights",
    "Rochester Hills",
    "Livonia",
    "Dearborn",
    "Westland",
    "Troy",
    "Farmington Hills",
    "Southfield",
    "Novi",
    "Dearborn Heights",
  ];

  const eventCategories = [
    "All Events",
    "Concert",
    "Sports",
    "Theater",
    "Comedy",
    "Family",
    "Festival",
    "Music",
    "Rock",
    "Country",
    "Hip Hop",
    "Jazz",
    "Classical",
    "Pop",
    "Blues",
    "Folk",
    "Electronic",
    "R&B",
    "Reggae",
    "Gospel",
    "Opera",
    "Ballet",
    "Dance",
    "Circus",
    "Magic",
    "Variety",
    "Lecture",
    "Workshop",
    "Exhibition",
    "Tour",
    "Outdoor",
    "Indoor",
    "Free",
    "Charity",
    "Fundraiser",
    "Networking",
    "Conference",
    "Seminar",
    "Trade Show",
    "Expo",
    "Fair",
    "Carnival",
    "Parade",
    "Fireworks",
    "Holiday",
    "Seasonal",
    "Cultural",
    "Historical",
    "Educational",
    "Entertainment",
  ];

  const timeframeOptions = [
    { value: "1month", label: "Next Month" },
    { value: "3months", label: "Next 3 Months" },
    { value: "6months", label: "Next 6 Months" },
    { value: "1year", label: "Next Year" },
    { value: "all", label: "All Upcoming" },
  ];

  const resultsPerPageOptions = [
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
    { value: "100", label: "100 per page" },
    { value: "200", label: "200 per page" },
  ];

  const sortOptions = [
    { value: "mostRecent", label: "Most Recent" },
    { value: "dateAsc", label: "Date (Earliest First)" },
    { value: "dateDesc", label: "Date (Latest First)" },
    { value: "priceLow", label: "Price (Low to High)" },
    { value: "priceHigh", label: "Price (High to Low)" },
    { value: "nameAZ", label: "Name (A-Z)" },
    { value: "venueAZ", label: "Venue (A-Z)" },
  ];

  const fetchEvents = async (
    city = searchCity,
    keyword = searchKeyword,
    timeRange = timeframe,
    pageSize = resultsPerPage,
    page = 0
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        city: city === "All" ? "" : city,
        keyword: keyword === "All Events" ? "" : keyword,
        timeframe: timeRange,
        size: pageSize,
      });

      const response = await fetch(`/api/events?${params}`);
      const data = await response.json();

      if (data.error) {
        console.error("API Error:", data.error);
        setEvents([]);
        setTotalEvents(0);
      } else {
        const fetchedEvents = data.events || [];
        // Sort the events based on current sort preference
        const sortedEvents = sortEvents(fetchedEvents, sortBy);
        setEvents(sortedEvents);
        setTotalEvents(data.total || 0);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      setTotalEvents(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset to page 0 and fetch events, sorting will be applied in fetchEvents
    fetchEvents(searchCity, searchKeyword, timeframe, resultsPerPage, 0);
  };

  const handleCityChange = (city) => {
    setSearchCity(city);
    fetchEvents(city, searchKeyword, timeframe, resultsPerPage, 0);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    fetchEvents(searchCity, searchKeyword, newTimeframe, resultsPerPage, 0);
  };

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setResultsPerPage(newResultsPerPage);
    fetchEvents(searchCity, searchKeyword, timeframe, newResultsPerPage, 0);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    // Re-sort existing events without making a new API call
    const sortedEvents = sortEvents([...events], newSortBy);
    setEvents(sortedEvents);
  };

  const sortEvents = (eventsToSort, sortType) => {
    if (!eventsToSort || eventsToSort.length === 0) return eventsToSort;

    return [...eventsToSort].sort((a, b) => {
      switch (sortType) {
        case "mostRecent":
          // Sort by date, most recent first (closest to today)
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date) - new Date(b.date);

        case "dateAsc":
          // Sort by date, earliest first
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date) - new Date(b.date);

        case "dateDesc":
          // Sort by date, latest first
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date);

        case "priceLow":
          // Sort by price, lowest first
          if (!a.priceRange && !b.priceRange) return 0;
          if (!a.priceRange) return 1;
          if (!b.priceRange) return -1;
          return (a.priceRange.min || 0) - (b.priceRange.min || 0);

        case "priceHigh":
          // Sort by price, highest first
          if (!a.priceRange && !b.priceRange) return 0;
          if (!a.priceRange) return 1;
          if (!b.priceRange) return -1;
          return (b.priceRange.max || 0) - (a.priceRange.max || 0);

        case "nameAZ":
          // Sort by name alphabetically
          if (!a.name && !b.name) return 0;
          if (!a.name) return 1;
          if (!b.name) return -1;
          return a.name.localeCompare(b.name);

        case "venueAZ":
          // Sort by venue name alphabetically
          if (!a.venue?.name && !b.venue?.name) return 0;
          if (!a.venue?.name) return 1;
          if (!b.venue?.name) return -1;
          return a.venue.name.localeCompare(b.venue.name);

        default:
          return 0;
      }
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr;
  };

  const formatPrice = (priceRange) => {
    if (!priceRange) return "Price TBD";
    return `$${priceRange.min} - $${priceRange.max}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Michigan Events
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover amazing events, concerts, sports, and entertainment across
            the Great Lakes State
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* City Selection */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <MapPin className="inline w-4 h-4 mr-2" />
                  City
                </label>
                <select
                  id="city"
                  value={searchCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {michiganCities.map((city) => (
                    <option key={city} value={city}>
                      {city === "All" ? "All Michigan Cities" : city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Category Selection */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Filter className="inline w-4 h-4 mr-2" />
                  Event Category
                </label>
                <select
                  id="category"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {eventCategories.map((category) => (
                    <option
                      key={category}
                      value={category === "All Events" ? "" : category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeframe Selection */}
              <div>
                <label
                  htmlFor="timeframe"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Timeframe
                </label>
                <select
                  id="timeframe"
                  value={timeframe}
                  onChange={(e) => handleTimeframeChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeframeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Per Page */}
              <div>
                <label
                  htmlFor="resultsPerPage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Search className="inline w-4 h-4 mr-2" />
                  Results Per Page
                </label>
                <select
                  id="resultsPerPage"
                  value={resultsPerPage}
                  onChange={(e) => handleResultsPerPageChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {resultsPerPageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button - Full Width */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-md bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
              >
                <Search className="inline w-4 h-4 mr-2" />
                Search Events
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {searchKeyword ? `${searchKeyword} Events` : "Upcoming Events"}
            </h2>
            <p className="text-gray-600">
              {searchCity === "All" ? "Across Michigan" : `in ${searchCity}`} •{" "}
              {totalEvents} events found
            </p>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center space-x-3">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding amazing events for you...</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
                      priority
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.name || "TBD"}
                  </h3>

                  {/* Event Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>

                    {event.time && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          {formatTime(event.time)}
                        </span>
                      </div>
                    )}

                    {event.venue && (
                      <div className="flex items-start text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium">{event.venue.name}</div>
                          <div>
                            {event.venue.city}, {event.venue.state}
                          </div>
                        </div>
                      </div>
                    )}

                    {event.priceRange && (
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          {formatPrice(event.priceRange)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Categories */}
                  {event.classifications && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.classifications.genre && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {event.classifications.genre}
                        </span>
                      )}
                      {event.classifications.segment && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {event.classifications.segment}
                        </span>
                      )}
                    </div>
                  )}

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
        )}

        {/* Pagination Controls */}
        {!loading &&
          events.length > 0 &&
          totalEvents > parseInt(resultsPerPage) && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    fetchEvents(
                      searchCity,
                      searchKeyword,
                      timeframe,
                      resultsPerPage,
                      Math.max(0, currentPage - 1)
                    )
                  }
                  disabled={currentPage === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {currentPage + 1} of{" "}
                  {Math.ceil(totalEvents / parseInt(resultsPerPage))}
                </span>

                <button
                  onClick={() =>
                    fetchEvents(
                      searchCity,
                      searchKeyword,
                      timeframe,
                      resultsPerPage,
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage >=
                    Math.ceil(totalEvents / parseInt(resultsPerPage)) - 1
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

        {/* No Results */}
        {!loading && events.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or city, or browse all events
              across Michigan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
