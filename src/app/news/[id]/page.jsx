import React from 'react'
import NewsPage from '../comp/newsPage'

export async function generateMetadata({ params }) {
  const searchTerm = params.id.toLowerCase();

  return {
    title: `${searchTerm.toUpperCase()} News | Locale Michigan`,
    description: `Latest ${searchTerm} news and updates`,
    openGraph: {
      title: `${searchTerm.toUpperCase()} News`,
      description: `Stay updated with the latest ${searchTerm} news`,
      images: [`https://localemichigan.com/news.webp`],
      url: `https://localemichigan.com/news/${searchTerm}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const Page = ({params}) => {
 
  return (
    <div>
      <NewsPage params={params} />
    </div>
  );
}

export default Page