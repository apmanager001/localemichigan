import React from 'react'
import City from '../comp/city'


export async function generateMetadata({ params }) {
  const cityName = params.id.toLowerCase();

  const description = `Discover key insights about ${cityName.toUpperCase()}, Michigan — including population trends from 2000 to 2020, land area, population density, geographic coordinates, and sister city connections. Whether you are a resident, researcher, or just curious, this page offers a snapshot of ${cityName.toUpperCase()}'s growth, layout, and global ties. Stay informed with local weather updates and explore what makes this Michigan city unique.`;
  return {
    title: `${cityName.toUpperCase()}  | Locale Michigan`,
    description: description,
    openGraph: {
      title: `${cityName.toUpperCase()} `,
      description: description,
      images: [`https://localemichigan.com/news.webp`],
      url: `https://localemichigan.com/cities/${cityName}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
const Page = () => {
  return (
    <div>
      <City />
    </div>
  )
}

export default Page