import React from 'react'
import LighthousePage from './comp/lighthouse'

export async function generateMetadata() {
  return {
    title: "All Michigan Lighthouses | Locale Michigan",
    description:
      "Explore Michigan's historic lighthouses with interactive maps, featured highlights, and links to detailed pages for each location.",
    openGraph: {
      title: "All Michigan Lighthouses | Locale Michigan",
      description:
        "Discover Michigan's iconic lighthouses with location data, heritage links, and detailed profiles. Plan your visit or learn their history.",
      images: ["https://localemichigan.com/logo.png"],
      url: "https://localemichigan.com/lighthouses",
      siteName: "Locale Michigan",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Michigan Lighthouses | Locale Michigan",
      description:
        "Explore Michigan's lighthouse legacy with maps, featured locations, and links to individual lighthouse pages.",
      images: ["https://localemichigan.com/logo.png"],
    },
  };
}

const Page = () => {
  return (
    <div><LighthousePage /></div>
  )
}

export default Page