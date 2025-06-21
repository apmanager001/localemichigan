import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from './comp/header'
import Footer from './comp/footer'
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
  title: {
    default: "Locale Michigan",
    template: `%s | Locale Michigan`,
  },
  keywords: ["Michigan Parks", "Michigan Lakes", "Michigan Lighthouse"],
  openGraph: {
    description: `Discover vibrant cities, stunning lighthouses, serene parks,
            fascinating museums, and breathtaking lakes. Your Michigan adventure
            starts here!`,
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
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
            <main className="flex-grow">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
