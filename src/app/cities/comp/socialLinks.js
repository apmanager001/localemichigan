import React from "react";
import Image from "next/image";
import {
  Building2,
  History,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

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
        <Image
          src="/icons/wiki2.png"
          alt="Wikipedia"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      ),
    },
    {
      key: "facebook",
      icon: Facebook,
      url: cityData?.facebook,
      label: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      key: "instagram",
      icon: Instagram,
      url: cityData?.instagram,
      label: "Instagram",
      color:
        "bg-gradient-to-r from-[#E4405F] to-[#C13584] hover:from-[#D63384] hover:to-[#B02A37]",
    },
    {
      key: "x",
      icon: Twitter,
      url: cityData?.x,
      label: "X (Twitter)",
      color: "bg-black hover:bg-gray-800",
    },
    {
      key: "youtube",
      icon: Youtube,
      url: cityData?.youtube,
      label: "YouTube",
      color: "bg-[#FF0000] hover:bg-[#CC0000]",
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
