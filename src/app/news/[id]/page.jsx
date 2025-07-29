import React from "react";
import NewsPage from "../comp/newsPage";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const searchTerm = resolvedParams.id.toLowerCase();

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

const Page = async ({ params }) => {
  const resolvedParams = await params;

  return (
    <div>
      <NewsPage params={resolvedParams} />
    </div>
  );
};

export default Page;
