import React from 'react'
import Cities from './comp/cities'

export async function generateMetadata() {
  return {
    title: `All Michigan Cities | Locale Michigan`,
    description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information.`,
    openGraph: {
      title: `All Michigan Cities | Locale Michigan`,
      description: `Explore a comprehensive list of Michigan cities. Use the search to quickly find any city and access detailed local information.`,
      images: [`https://localemichigan.com/`],
      url: `https://localemichigan.com/cities}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const Page = () => {
  return (
    <div><Cities /></div>
  )
}

export default Page