import React, { useEffect } from "react";
import { Facebook as FacebookIcon } from "lucide-react";

const FacebookFeed = ({ cityData }) => {
  useEffect(() => {
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement("script");
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.nonce = "fb";
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, [cityData.facebook]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <FacebookIcon size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Facebook Feed</h3>
          <p className="text-sm text-gray-500">
            Latest updates from {cityData.name}
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div
          className="fb-page w-full max-w-md"
          data-href={cityData.facebook}
          data-tabs="timeline"
          data-height="500"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite={cityData.facebook}
            className="fb-xfbml-parse-ignore"
          >
            <a
              href={cityData.facebook}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Visit {cityData.name} on Facebook
            </a>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FacebookFeed;
