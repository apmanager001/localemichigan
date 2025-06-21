"use client";
import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import PostHogPageView from './postHogPageView'

export function PostHogProvider({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    if(pathname){
      let url = window.origin + pathname
      if(searchParams.toString()){
        url = url + '?' + searchParams.toString()
      }
      posthog.capture('$pageview', {'$current_url': url })
    }
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false,
    });
  }, [pathname, searchParams]);

  useEffect(()=> {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
)}
