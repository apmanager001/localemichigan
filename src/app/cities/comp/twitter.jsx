import React, { useEffect } from "react";
import { Twitter as TwitterIcon } from "lucide-react";

const TwitterFeed = ({ cityData }) => {
  useEffect(() => {
    // Load Twitter Widget
    if (window.twttr) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }
  }, [cityData.twitter]);

  if (!cityData.twitter) {
    return null;
  }

  // Extract username from Twitter URL
  const getTwitterUsername = (url) => {
    try {
      const match = url.match(/twitter\.com\/([^\/\?]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const username = getTwitterUsername(cityData.twitter);

  if (!username) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <TwitterIcon size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Twitter Feed</h3>
          <p className="text-sm text-gray-500">
            Latest updates from {cityData.name}
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-md">
          <a
            className="twitter-timeline"
            data-height="500"
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            href={`https://twitter.com/${username}`}
          >
            Tweets by {username}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TwitterFeed;
