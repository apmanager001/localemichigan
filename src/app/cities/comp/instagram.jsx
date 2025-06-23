'use client'
import React, { useEffect } from "react";

const Instagram = ({ cityData }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://www.instagram.com/embed.js");
    script.setAttribute("async", "");
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
  }, [cityData.instagram]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Instagram</h2>
      <div className="mockup-window border bg-base-300">
        <div className="flex justify-center bg-base-100 p-4">
          <blockquote
            className="instagram-media h-96"
            data-instgrm-permalink=""
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "3px",
              boxShadow:
                "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "658px",
              minWidth: "326px",
              padding: 0,
              width: "99.375%",
            }}
          ></blockquote>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
