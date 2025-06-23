import React, { useEffect } from "react";

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
    <div className="p-4 ">
      <h2 className="text-lg font-bold mb-4">Facebook</h2>
      <div className="flex justify-center w-full">
        <div
            className="fb-page"
            data-href={cityData.facebook}
            data-tabs="timeline"
            // data-width="500"
            data-height="600"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
        >
            <blockquote cite={cityData.facebook} className="fb-xfbml-parse-ignore">
            <a href={cityData.facebook}>Facebook Page</a>
            </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FacebookFeed;
