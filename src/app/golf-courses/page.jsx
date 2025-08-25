import React from "react";
import GolfCoursesPage from "./comp/golfCourses";

export const metadata = {
  title:
    "Michigan Golf Courses - Premier Golf Destinations & Championship Courses",
  description:
    "Discover Michigan's premier golf courses, from championship layouts to scenic public courses. Plan your golf getaway with our comprehensive guide to Michigan's best golf destinations.",
  keywords: [
    "Michigan golf courses",
    "Michigan golf destinations",
    "Michigan championship golf",
    "Michigan public golf courses",
    "Michigan golf resorts",
    "Michigan golf packages",
    "Michigan golf tournaments",
    "Michigan golf vacation",
    "Michigan golf rates",
    "Michigan golf tee times",
    "Michigan golf course reviews",
  ],
  openGraph: {
    title:
      "Michigan Golf Courses - Premier Golf Destinations & Championship Courses",
    description:
      "Discover Michigan's premier golf courses, from championship layouts to scenic public courses. Plan your golf getaway with our comprehensive guide.",
    url: "https://localemichigan.com/golf-courses",
    siteName: "Locale Michigan",
    images: [
      {
        url: "/images/golf.webp",
        width: 1200,
        height: 630,
        alt: "Michigan golf courses and golf destinations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Michigan Golf Courses - Premier Golf Destinations & Championship Courses",
    description:
      "Discover Michigan's premier golf courses, from championship layouts to scenic public courses. Plan your golf getaway.",
    images: ["/images/golf.webp"],
  },
  alternates: {
    canonical: "https://localemichigan.com/golf-courses",
  },
};

const Page = () => {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Michigan Golf Courses",
            description:
              "Comprehensive guide to Michigan golf courses including championship courses, public courses, and golf resorts",
            url: "https://localemichigan.com/golf-courses",
            mainEntity: {
              "@type": "ItemList",
              name: "Michigan Golf Courses",
              description: "Golf courses and golf destinations in Michigan",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Michigan Championship Golf Courses",
                  description: "Professional and tournament golf courses",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Michigan Public Golf Courses",
                  description:
                    "Public access golf courses and municipal courses",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Michigan Golf Resorts",
                  description: "Golf resorts and vacation destinations",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Michigan Golf Packages",
                  description: "Golf vacation packages and deals",
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
      <GolfCoursesPage />
    </div>
  );
};

export default Page;
