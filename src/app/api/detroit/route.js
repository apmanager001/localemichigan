import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail"],
    ],
  },
});

const extractImageFromContent = (html = "") => {
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match?.[1];
};



export async function GET() {
  try {
    const urls = [
      "https://www.wxyz.com/index.rss",
      "https://www.metrotimes.com/detroit/Rss.xml",
    ];

    const feeds = await Promise.all(urls.map((url) => parser.parseURL(url)));

    const allItems = feeds
      .flatMap((feed) =>
        feed.items.map((item) => ({
          id: item.guid,
          title: item.title,
          link: item.link,
          description: item.contentSnippet || item.description,
          content: item.content,
          pubDate: item.pubDate,
          image:
            item.mediaContent?.[0]?.$?.url ||
            item.mediaThumbnail?.$?.url ||
            item.enclosure?.url ||
            extractImageFromContent(item["content:encoded"] || item.content) ||
            "/news.webp",
          author: item.creator || item.author,
          categories: item.categories || [],
        }))
      )
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );

    return NextResponse.json(allItems);
  } catch (err) {
    console.error("RSS parsing error:", err);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
