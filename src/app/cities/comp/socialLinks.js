import React from "react";
import { Building2, History, ExternalLink } from "lucide-react";
import { SocialIcon } from "react-social-icons";

const SocialLinks = ({ cityData }) => {
  const socialLinks = [
    {
      key: "website",
      icon: Building2,
      url: cityData?.website,
      label: "Official Website",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      key: "wiki",
      icon: null,
      url: cityData?.wikiUrl,
      label: "Wikipedia",
      color: "bg-gray-500 hover:bg-gray-600",
      customIcon: (
        <img src="/icons/wiki2.png" className="h-5 w-5" alt="Wikipedia" />
      ),
    },
    {
      key: "facebook",
      icon: null,
      url: cityData?.facebook,
      label: "Facebook",
      socialIcon: "facebook",
      bgColor: "#1877F2", // Facebook blue
    },
    {
      key: "instagram",
      icon: null,
      url: cityData?.instagram,
      label: "Instagram",
      socialIcon: "instagram",
      bgColor: "#E4405F", // Instagram pink
    },
    {
      key: "x",
      icon: null,
      url: cityData?.x,
      label: "X (Twitter)",
      socialIcon: "x",
      bgColor: "#000000", // X/Twitter black
    },
    {
      key: "youtube",
      icon: null,
      url: cityData?.youtube,
      label: "YouTube",
      socialIcon: "youtube",
      bgColor: "#FF0000", // YouTube red
    },
    {
      key: "history",
      icon: History,
      url: cityData?.historySite,
      label: "Historical Site",
      color: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  const filteredLinks = socialLinks.filter((link) => link.url);

  if (filteredLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {filteredLinks.map((link) => (
        <div key={link.key} className="group relative">
          {link.socialIcon ? (
            // Use SocialIcon's built-in link functionality with brand colors
            <SocialIcon
              network={link.socialIcon}
              url={link.url}
              style={{
                height: 40,
                width: 40,
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              fgColor="white"
              bgColor={link.bgColor}
              className="transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105"
              title={link.label}
            />
          ) : (
            // Custom link for non-social icons
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${link.color} text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105`}
              title={link.label}
            >
              {link.customIcon ? (
                link.customIcon
              ) : link.icon ? (
                <link.icon size={20} />
              ) : (
                <ExternalLink size={20} />
              )}
            </a>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            {link.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
