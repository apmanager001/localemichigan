import React from "react";
import Link from "next/link";
import Head from "next/head";
import {
  TrainTrack,
  Fish,
  Squirrel,
  ArrowLeft,
  Search,
  Home,
  MapPin,
} from "lucide-react";

export const runtime = "edge";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found - 404 Error | Locale Michigan</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Locale Michigan to explore Michigan cities, parks, lakes, and more."
        />
        <meta name="robots" content="noindex, nofollow, nocache" />
        <link rel="canonical" href="https://localemichigan.com/404" />
        <meta name="googlebot" content="noindex, nofollow, noimageindex" />
      </Head>

      <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow border border-slate-200 mb-6">
            <span className="text-2xl font-bold text-slate-700">404</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We can't seem to find the page you're looking for. It might have
            been moved, renamed, or it just doesn't exist.
          </p>

          {/* Quick Navigation */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/cities"
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-700">Explore Cities</span>
            </Link>
            <Link
              href="/lakes"
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <Fish className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-700">Discover Lakes</span>
            </Link>
            <Link
              href="/parks"
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <Squirrel className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-700">Visit Parks</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition shadow"
            >
              <Home className="w-4 h-4" /> Go back home
            </Link>
            <Link
              href="/cities"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 transition shadow-sm"
            >
              <Search className="w-4 h-4" /> Browse all cities
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-slate-500">
            <div className="flex flex-col items-center">
              <TrainTrack size={36} />
              <span className="text-xs mt-1">Rails</span>
            </div>
            <div className="flex flex-col items-center">
              <Fish size={36} />
              <span className="text-xs mt-1">Lakes</span>
            </div>
            <div className="flex flex-col items-center">
              <Squirrel size={36} />
              <span className="text-xs mt-1">Parks</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
