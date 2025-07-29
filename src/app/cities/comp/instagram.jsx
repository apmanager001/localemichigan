"use client";
import React, { useEffect } from "react";
import { Instagram as InstagramIcon } from "lucide-react";

const InstagramFeed = ({ cityData }) => {
  useEffect(() => {
    // Load Instagram Embed
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, [cityData.instagram]);

  if (!cityData.instagram) {
    return null;
  }

  // Extract username from Instagram URL
  const getInstagramUsername = (url) => {
    try {
      const match = url.match(/instagram\.com\/([^\/\?]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const username = getInstagramUsername(cityData.instagram);

  if (!username) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <InstagramIcon size={16} className="text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800">Instagram</h4>
          <p className="text-xs text-gray-500">@{username}</p>
        </div>
      </div>

      {/* Instagram Profile Link */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <InstagramIcon size={32} className="text-white" />
          </div>
          <div>
            <h5 className="font-semibold text-gray-800 mb-2">@{username}</h5>
            <p className="text-sm text-gray-600 mb-4">
              Follow {cityData.name} on Instagram
            </p>
          </div>
          <a
            href={cityData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
          >
            <InstagramIcon size={16} />
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
