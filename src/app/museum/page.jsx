import React from "react";
import MuseumsPage from "./comp/museum";

export const metadata = {
  title:
    "Michigan Museums - Explore Art, History, Science & Cultural Attractions",
  description:
    "Discover Michigan's fascinating museums, from art galleries to history museums, science centers, and cultural institutions. Plan your visit to Michigan's best museums and educational attractions.",
  keywords: [
    "Michigan museums",
    "Michigan art museums",
    "Michigan history museums",
    "Michigan science museums",
    "Michigan cultural attractions",
    "Michigan museum exhibits",
    "Michigan educational attractions",
    "Michigan museum tours",
    "Michigan museum events",
    "Michigan museum collections",
    "Michigan museum admission",
  ],
  openGraph: {
    title:
      "Michigan Museums - Explore Art, History, Science & Cultural Attractions",
    description:
      "Discover Michigan's fascinating museums, from art galleries to history museums, science centers, and cultural institutions. Plan your visit to Michigan's best museums.",
    url: "https://localemichigan.com/museum",
    siteName: "Locale Michigan",
    images: [
      {
        url: "/images/museum.webp",
        width: 1200,
        height: 630,
        alt: "Michigan museums and cultural attractions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Michigan Museums - Explore Art, History, Science & Cultural Attractions",
    description:
      "Discover Michigan's fascinating museums, from art galleries to history museums, science centers, and cultural institutions.",
    images: ["/images/museum.webp"],
  },
  alternates: {
    canonical: "https://localemichigan.com/museum",
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
            name: "Michigan Museums",
            description:
              "Comprehensive guide to Michigan museums including art, history, science, and cultural institutions",
            url: "https://localemichigan.com/museum",
            mainEntity: {
              "@type": "ItemList",
              name: "Michigan Museums",
              description: "Museums and cultural institutions in Michigan",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Michigan Art Museums",
                  description: "Art galleries and fine art museums",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Michigan History Museums",
                  description: "Historical museums and heritage sites",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Michigan Science Museums",
                  description: "Science centers and educational museums",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Michigan Cultural Institutions",
                  description: "Cultural centers and heritage museums",
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
      <MuseumsPage />
    </div>
  );
};

export default Page;
