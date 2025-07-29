import Hero from "./comp/hero";
import News from "./comp/news";
import TopCities from "./comp/homepage/topCities";
import ExploreHero from "./comp/homepage/categoryhero";
import HomepageMap from "./comp/homepageMap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Locale Michigan - Your Complete Guide to Michigan Cities, Parks & Attractions",
  description:
    "Discover Michigan's best cities, stunning lighthouses, serene parks, fascinating museums, and breathtaking lakes. Get local news, interactive maps, and detailed community information for the Great Lakes State.",
  keywords: [
    "Michigan travel guide",
    "Michigan cities",
    "Michigan attractions",
    "Michigan tourism",
    "Great Lakes travel",
    "Michigan local news",
    "Michigan interactive maps",
    "Michigan community guide",
  ],
  openGraph: {
    title:
      "Locale Michigan - Your Complete Guide to Michigan Cities, Parks & Attractions",
    description:
      "Discover Michigan's best cities, stunning lighthouses, serene parks, fascinating museums, and breathtaking lakes. Get local news, interactive maps, and detailed community information.",
    url: "https://localemichigan.com",
    siteName: "Locale Michigan",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Michigan landscape with cities, lakes, and natural beauty",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Locale Michigan - Your Complete Guide to Michigan Cities, Parks & Attractions",
    description:
      "Discover Michigan's best cities, stunning lighthouses, serene parks, fascinating museums, and breathtaking lakes.",
    images: ["/hero.webp"],
  },
  alternates: {
    canonical: "https://localemichigan.com",
  },
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Locale Michigan - Your Complete Guide to Michigan",
            description:
              "Comprehensive guide to Michigan cities, parks, lakes, lighthouses, and museums with interactive maps and local news",
            url: "https://localemichigan.com",
            mainEntity: {
              "@type": "ItemList",
              name: "Michigan Attractions",
              description:
                "Cities, parks, lakes, lighthouses, and museums in Michigan",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Michigan Cities",
                  url: "https://localemichigan.com/cities",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Michigan Parks",
                  url: "https://localemichigan.com/parks",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Michigan Lakes",
                  url: "https://localemichigan.com/lakes",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Michigan Lighthouses",
                  url: "https://localemichigan.com/lighthouses",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Michigan Museums",
                  url: "https://localemichigan.com/museum",
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
      <Hero />
      <TopCities />
      {/* <ExploreHero /> */}
      <News />
      <HomepageMap />
    </div>
  );
}
