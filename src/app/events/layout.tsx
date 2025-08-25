import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Michigan Events - Concerts, Sports & Entertainment | Locale Michigan",
  description:
    "Discover amazing events, concerts, sports games, and entertainment across Michigan. Search by city and find tickets to the hottest events in the Great Lakes State.",
  keywords: [
    "Michigan events",
    "Michigan concerts",
    "Michigan sports events",
    "Michigan entertainment",
    "Detroit events",
    "Grand Rapids events",
    "Michigan tickets",
    "Michigan concerts 2024",
    "Michigan sports tickets",
    "Michigan theater events",
  ],
  openGraph: {
    title:
      "Michigan Events - Concerts, Sports & Entertainment | Locale Michigan",
    description:
      "Discover amazing events, concerts, sports games, and entertainment across Michigan. Search by city and find tickets to the hottest events in the Great Lakes State.",
    url: "https://localemichigan.com/events",
    siteName: "Locale Michigan",
    images: [
      {
        url: "/events/images/events.webp",
        width: 1200,
        height: 630,
        alt: "Michigan events and entertainment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Michigan Events - Concerts, Sports & Entertainment | Locale Michigan",
    description:
      "Discover amazing events, concerts, sports games, and entertainment across Michigan. Search by city and find tickets to the hottest events in the Great Lakes State.",
    images: ["/events/images/events.webp"],
  },
  alternates: {
    canonical: "https://localemichigan.com/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
