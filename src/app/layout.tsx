import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "./comp/header";
import Footer from "./comp/footer";
import { PostHogProvider } from "./provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://localemichigan.com"),
  title: {
    default: "Locale Michigan - Discover Michigan Cities, Parks, Lakes & More",
    template: "%s | Locale Michigan",
  },
  description:
    "Explore Michigan's vibrant cities, stunning lighthouses, serene parks, fascinating museums, and breathtaking lakes. Your comprehensive guide to the Great Lakes State with interactive maps, local news, and detailed community information.",
  keywords: [
    "Michigan",
    "Michigan cities",
    "Michigan parks",
    "Michigan lakes",
    "Michigan lighthouses",
    "Michigan museums",
    "Michigan tourism",
    "Great Lakes",
    "Detroit",
    "Grand Rapids",
    "Traverse City",
    "Michigan travel",
    "Michigan attractions",
    "Michigan communities",
    "Michigan demographics",
    "Michigan geography",
    "Michigan local news",
  ],
  authors: [{ name: "Locale Michigan" }],
  creator: "Locale Michigan",
  publisher: "Locale Michigan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://localemichigan.com",
    siteName: "Locale Michigan",
    title: "Locale Michigan - Discover Michigan Cities, Parks, Lakes & More",
    description:
      "Explore Michigan's vibrant cities, stunning lighthouses, serene parks, fascinating museums, and breathtaking lakes. Your comprehensive guide to the Great Lakes State.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Locale Michigan - Your Guide to Michigan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@localemichigan",
    creator: "@localemichigan",
    title: "Locale Michigan - Discover Michigan Cities, Parks, Lakes & More",
    description:
      "Explore Michigan's vibrant cities, stunning lighthouses, serene parks, fascinating museums, and breathtaking lakes.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://localemichigan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth w-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Locale Michigan",
              url: "https://localemichigan.com",
              description:
                "Comprehensive guide to Michigan cities, parks, lakes, lighthouses, and museums",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://localemichigan.com/cities?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Locale Michigan",
                url: "https://localemichigan.com",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full`}
      >
        <PostHogProvider>
          <Toaster
            position={"top-left"}
            toastOptions={{
              duration: 5000,
              style: {
                border: "2px solid #000",
                padding: "22px",
                color: "#713200",
                fontSize: "16px",
                fontWeight: "700",
              },
              success: {
                style: {
                  background: "#CFFDBC",
                },
              },
              error: {
                style: {
                  background: "#ff9494",
                },
              },
            }}
          />
          <Header />
          <main className="flex-grow pt-16 relative">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
