'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'

const News = () => {
    const [detroitNews, setDetroitNews] = useState([])
    const [michiganNews, setMichiganNews] = useState([])
    const [traverseNews, setTraverseNews] = useState([]);

    const fetchAllNews = async () => {
      try {
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

        setDetroitNews(detroitRes);
        setMichiganNews(michiganRes);
        setTraverseNews(traverseRes);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    
    useEffect(() => {
      fetchAllNews();
    }, []);

    const isLoading =
      detroitNews.length === 0 &&
      michiganNews.length === 0

    if (isLoading) {
      return (
        <div className="p-4 sm:p-6 lg:p-12 xl:p-20">
          <h2 className="text-2xl text-center font-bold mb-2">
            Loading News...
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-64 w-44 rounded-lg" />
            ))}
          </div>
        </div>
      );
    }

    const renderArticles = (articles) => (
      // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
      <div className="flex flex-wrap justify-center gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow text-sm h-64 w-52"
          >
            <figure className="h-28 overflow-hidden">
              <img
                src={article.image || "/default-news.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-3">
              <h3 className="card-title text-base font-semibold line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {article.description}
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
                  className="btn btn-xs btn-soft btn-primary"
                >
                  Read
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  
  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-20 mb-24">
      <div className="relative mb-2">
        <h2 className="text-2xl font-bold text-left sm:text-center">
          Detroit News
        </h2>
        <Link
          href="/news/detroit"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          All Detroit News →
        </Link>
      </div>
      {renderArticles(detroitNews.slice(0, 4))}

      <div className="relative mb-2">
        {/* Centered on desktop, left on mobile */}
        <h2 className="text-2xl font-bold text-left sm:text-center">
          Michigan News
        </h2>

        {/* Always top-right, overlapping the row */}
        <Link
          href="/news/michigan"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          All Michigan News →
        </Link>
      </div>

      {renderArticles(michiganNews.slice(0, 4))}

      <div className="relative mb-2">
        <h2 className="text-2xl font-bold text-left sm:text-center">
          Traverse City News
        </h2>
        <Link
          href="/news/traversecity"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          All Traverse City News →
        </Link>
      </div>
      {renderArticles(traverseNews.slice(0, 4))}
    </div>
  );
  
}

export default News