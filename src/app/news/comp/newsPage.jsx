"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { useParams } from "next/navigation";

const NewsPage = () => {
    const [articles, setArticles] = useState([])
    const [query, setQuery] = useState("");

  const params = useParams();
  const searchTerm = params.id.toLowerCase();

  const fetchAllNews = async () => {
    try {
      const response = await Promise.all([
        fetch(`/api/${searchTerm}`)
          .then((res) => res.json())
          .catch(() => []),
      ]);

      setArticles(response[0]);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  const filteredArticles = articles.filter((article) =>
    (article.title + article.description)
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  

  if (articles.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton h-80 w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 my-10 px-6">
        {/* Back Button */}
        <div className="w-full lg:w-auto">
          <Link
            href="/"
            className="flex items-center text-lg text-primary hover:underline"
          >
            <ArrowBigLeft className="mr-1" /> Back to Homepage
          </Link>
        </div>

        {/* Centered Heading */}
        <h2 className="text-2xl font-extrabold text-center flex-1">
          {searchTerm.toUpperCase()} News
        </h2>

        {/* Article Count */}
        <div className="w-full lg:w-auto text-right">
          <h3 className="text-sm text-gray-400">
            Number of Articles: {filteredArticles.length}
          </h3>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search articles..."
          className="input input-bordered w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
        {filteredArticles.map((article, index) => (
          <div
            key={article.id || index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-full"
          >
            <figure className="relative h-48">
              <img
                src={article.image || article.content || "/default-news.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <span className="badge badge-soft badge-primary">
                  {new URL(article.link).hostname.replace(/^www\./, "")}
                </span>
              </div>
            </figure>
            <div className="card-body p-4">
              <Link
                href={article.link}
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <h3 className="card-title text-md line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm line-clamp-3">
                {article.description || article.content}
              </p>
              <div className="card-actions justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(article.pubDate).toLocaleDateString()}
                </span>
                <Link
                  href={article.link}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-soft btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsPage;
