import React from "react";
import Cities from "./comp/cities";

export async function generateMetadata() {
  return {
    title: `All Michigan Cities | Locale Michigan`,
    description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information including demographics, geography, and community resources.`,
    keywords: [
      "Michigan cities",
      "Michigan cities list",
      "Michigan municipalities",
      "Michigan communities",
      "Michigan city guide",
      "Michigan local information",
      "Michigan demographics",
      "Michigan geography",
    ],
    openGraph: {
      title: `All Michigan Cities | Locale Michigan`,
      description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information.`,
      images: [`https://localemichigan.com/logo.png`],
      url: `https://localemichigan.com/cities`,
      siteName: "Locale Michigan",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `All Michigan Cities | Locale Michigan`,
      description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information.`,
      images: [`https://localemichigan.com/logo.png`],
    },
    alternates: {
      canonical: "https://localemichigan.com/cities",
    },
  };
}

const Page = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "All Michigan Cities",
            "description": "Comprehensive list of Michigan cities with search functionality and detailed information",
            "url": "https://localemichigan.com/cities",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Michigan Cities",
              "description": "List of cities and municipalities in Michigan",
              "numberOfItems": 500
            },
            "publisher": {
              "@type": "Organization",
              "name": "Locale Michigan",
              "url": "https://localemichigan.com"
            }
          })
        }}
      />
      <Cities />
    </div>
  );
};

export default Page;
