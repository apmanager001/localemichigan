"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import defaultNews from "./images/news.webp";
import Link from "next/link";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";

const News = () => {
  const [detroitNews, setDetroitNews] = useState([]);
  const [michiganNews, setMichiganNews] = useState([]);
  const [traverseNews, setTraverseNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllNews = async () => {
    try {
      setLoading(true);
      const [detroitRes, michiganRes, traverseRes] = await Promise.all([
        fetch("/api/detroit")
          .then((res) => res.json())
          .catch(() => []),
        fetch("/api/michigan")
          .then((res) => res.json())
          .catch(() => []),
        fetch("/api/traversecity")
          .then((res) => res.json())
          .catch(() => []),
      ]);

      setDetroitNews(Array.isArray(detroitRes) ? detroitRes : []);
      setMichiganNews(Array.isArray(michiganRes) ? michiganRes : []);
      setTraverseNews(Array.isArray(traverseRes) ? traverseRes : []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  const getImageUrl = (article) => {
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
    return defaultNews;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "unknown";
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Latest News
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news from Detroit, Michigan, and
              Traverse City
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const NewsSection = ({ title, articles, linkPath, linkText }) => (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {title}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded"></div>
        </div>
        <Link
          href={linkPath}
          className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
        >
          {linkText}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No news available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article, index) => (
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

              <div className="p-5">
                <Link
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h4 className="font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.description}
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
                    Read
                    <ExternalLink size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay updated with the latest news and developments from across
            Michigan
          </p>
        </div>

        {/* News Sections */}
        <NewsSection
          title="Detroit News"
          articles={detroitNews}
          linkPath="/news/detroit"
          linkText="View All Detroit News"
        />

        <NewsSection
          title="Michigan News"
          articles={michiganNews}
          linkPath="/news/michigan"
          linkText="View All Michigan News"
        />

        <NewsSection
          title="Traverse City News"
          articles={traverseNews}
          linkPath="/news/traversecity"
          linkText="View All Traverse City News"
        />
      </div>
    </section>
  );
};

export default News;
