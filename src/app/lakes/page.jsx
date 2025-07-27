import React from "react";
import LakesPage from "./comp/lakes";

export const metadata = {
  title: "Michigan Lakes - Explore the Great Lakes State's Beautiful Waterways",
  description:
    "Discover Michigan's stunning lakes, from the Great Lakes to inland lakes. Find lake information, activities, locations, and plan your perfect Michigan lake adventure.",
  keywords: [
    "Michigan lakes",
    "Great Lakes",
    "Lake Michigan",
    "Lake Superior",
    "Lake Huron",
    "Lake Erie",
    "Michigan inland lakes",
    "Michigan lake activities",
    "Michigan lake fishing",
    "Michigan lake camping",
    "Michigan lake resorts",
  ],
  openGraph: {
    title:
      "Michigan Lakes - Explore the Great Lakes State's Beautiful Waterways",
    description:
      "Discover Michigan's stunning lakes, from the Great Lakes to inland lakes. Find lake information, activities, locations, and plan your perfect Michigan lake adventure.",
    url: "https://localemichigan.com/lakes",
    siteName: "Locale Michigan",
    images: [
      {
        url: "/images/lakes.webp",
        width: 1200,
        height: 630,
        alt: "Beautiful Michigan lakes and waterways",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Michigan Lakes - Explore the Great Lakes State's Beautiful Waterways",
    description:
      "Discover Michigan's stunning lakes, from the Great Lakes to inland lakes. Find lake information, activities, and locations.",
    images: ["/images/lakes.webp"],
  },
  alternates: {
    canonical: "https://localemichigan.com/lakes",
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
            name: "Michigan Lakes",
            description:
              "Comprehensive guide to Michigan lakes including the Great Lakes and inland lakes",
            url: "https://localemichigan.com/lakes",
            mainEntity: {
              "@type": "ItemList",
              name: "Michigan Lakes",
              description: "Lakes and waterways in Michigan",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Lake Michigan",
                  description: "One of the five Great Lakes",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Lake Superior",
                  description: "Largest of the Great Lakes",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Lake Huron",
                  description: "Second largest of the Great Lakes",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Lake Erie",
                  description: "Fourth largest of the Great Lakes",
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
      <LakesPage />
    </div>
  );
};

export default Page;
