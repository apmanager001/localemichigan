"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6 py-16">
          <div className="max-w-3xl w-full text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 shadow border border-red-200 mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Something went wrong
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We encountered a critical error. Please try refreshing the page or
              return to the homepage.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition shadow"
              >
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Go back home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
