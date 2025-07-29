"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultNews from "./images/news.webp";
import { ArrowBigLeft, Search, Calendar, ExternalLink } from "lucide-react";

const NewsPage = ({ params }) => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = params?.id?.toLowerCase() || "";

  const fetchAllNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchAllNews();
    }
  }, [searchTerm]);

  const filteredArticles = articles.filter((article) =>
    (article.title + article.description)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const getImageUrl = (article) => {
    // Check for valid image URLs in order of preference
    if (article.image && article.image.startsWith("http")) {
      return article.image;
    }
    if (
      article.content &&
      article.content.startsWith("http") &&
      (article.content.includes(".jpg") ||
        article.content.includes(".jpeg") ||
        article.content.includes(".png") ||
        article.content.includes(".webp"))
    ) {
      return article.content;
    }
    // Return default news image if no valid image found
    return defaultNews;
  };

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "unknown";
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Loading {searchTerm.toUpperCase()} news...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchAllNews}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <ArrowBigLeft className="mr-2" size={20} />
            Back to Homepage
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center flex-1">
            {searchTerm.toUpperCase()} News
          </h1>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {query ? "No articles found" : "No articles available"}
            </h3>
            <p className="text-gray-500">
              {query
                ? "Try adjusting your search terms"
                : "Check back later for updates"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id || index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getImageUrl(article)}
                    alt={article.title || "News article"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {getDomainFromUrl(article.link)}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {article.description || article.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(article.pubDate)}
                    </div>

                    <Link
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Read More
                      <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
