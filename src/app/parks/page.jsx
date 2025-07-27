import React from "react";
import ParksPage from "./comp/parks";

export const metadata = {
  title:
    "Michigan Parks - Discover State Parks, National Parks & Recreation Areas",
  description:
    "Explore Michigan's beautiful parks, from state parks to national parks and recreation areas. Find hiking trails, camping spots, outdoor activities, and natural attractions across the Great Lakes State.",
  keywords: [
    "Michigan parks",
    "Michigan state parks",
    "Michigan national parks",
    "Michigan hiking trails",
    "Michigan camping",
    "Michigan outdoor activities",
    "Michigan recreation areas",
    "Michigan nature preserves",
    "Michigan forest trails",
    "Michigan park camping",
    "Michigan park activities",
  ],
  openGraph: {
    title:
      "Michigan Parks - Discover State Parks, National Parks & Recreation Areas",
    description:
      "Explore Michigan's beautiful parks, from state parks to national parks and recreation areas. Find hiking trails, camping spots, outdoor activities, and natural attractions.",
    url: "https://localemichigan.com/parks",
    siteName: "Locale Michigan",
    images: [
      {
        url: "/images/park.webp",
        width: 1200,
        height: 630,
        alt: "Beautiful Michigan parks and natural landscapes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Michigan Parks - Discover State Parks, National Parks & Recreation Areas",
    description:
      "Explore Michigan's beautiful parks, from state parks to national parks and recreation areas. Find hiking trails, camping spots, and outdoor activities.",
    images: ["/images/park.webp"],
  },
  alternates: {
    canonical: "https://localemichigan.com/parks",
  },
};

const Page = () => {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Michigan Parks",
            description:
              "Comprehensive guide to Michigan parks including state parks, national parks, and recreation areas",
            url: "https://localemichigan.com/parks",
            mainEntity: {
              "@type": "ItemList",
              name: "Michigan Parks",
              description: "Parks and recreation areas in Michigan",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Michigan State Parks",
                  description: "State-operated parks and recreation areas",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Michigan National Parks",
                  description: "National park service sites in Michigan",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Michigan Recreation Areas",
                  description: "Public recreation areas and natural preserves",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Michigan Hiking Trails",
                  description: "Trails and outdoor recreation opportunities",
                },
              ],
            },
            publisher: {
              "@type": "Organization",
              name: "Locale Michigan",
              url: "https://localemichigan.com",
            },
          }),
        }}
      />
      <ParksPage />
    </div>
  );
};

export default Page;
