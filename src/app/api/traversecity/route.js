// app/api/gamespot/route.ts
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

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://www.gtcountymi.gov/RSSFeed.aspx?ModID=76&CID=All-0"
    );

    const formattedItems = feed.items.map((item) => ({
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
        '/news.webp',
      author: item.creator || item.author,
      categories: item.categories || [],
    }));

    return NextResponse.json(formattedItems);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch eurogamer news" },
      { status: 500 }
    );
  }
}
