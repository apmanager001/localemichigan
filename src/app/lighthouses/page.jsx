import React from "react";
import LighthousePage from "./comp/lighthouse";

export async function generateMetadata() {
  return {
    title: "All Michigan Lighthouses | Locale Michigan",
    description:
      "Explore Michigan's historic lighthouses with interactive maps, featured highlights, and links to detailed pages for each location. Discover the maritime heritage of the Great Lakes State.",
    keywords: [
      "Michigan lighthouses",
      "Great Lakes lighthouses",
      "Michigan maritime history",
      "Michigan lighthouse tours",
      "Michigan lighthouse locations",
      "Michigan lighthouse photos",
      "Michigan lighthouse history",
      "Michigan coastal attractions",
      "Michigan lighthouse map",
      "Michigan lighthouse guide",
    ],
    openGraph: {
      title: "All Michigan Lighthouses | Locale Michigan",
      description:
        "Discover Michigan's iconic lighthouses with location data, heritage links, and detailed profiles. Plan your visit or learn their history.",
      images: ["https://localemichigan.com/logo.png"],
      url: "https://localemichigan.com/lighthouses",
      siteName: "Locale Michigan",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Michigan Lighthouses | Locale Michigan",
      description:
        "Explore Michigan's lighthouse legacy with maps, featured locations, and links to individual lighthouse pages.",
      images: ["https://localemichigan.com/logo.png"],
    },
    alternates: {
      canonical: "https://localemichigan.com/lighthouses",
    },
  };
}

const Page = () => {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Michigan Lighthouses",
            description:
              "Comprehensive guide to Michigan lighthouses with interactive maps and historical information",
            url: "https://localemichigan.com/lighthouses",
            mainEntity: {
              "@type": "ItemList",
              name: "Michigan Lighthouses",
              description:
                "Historic lighthouses and maritime landmarks in Michigan",
              numberOfItems: 100,
            },
            publisher: {
              "@type": "Organization",
              name: "Locale Michigan",
              url: "https://localemichigan.com",
            },
          }),
        }}
      />
      <LighthousePage />
    </div>
  );
};

export default Page;
