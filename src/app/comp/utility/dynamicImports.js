import dynamic from "next/dynamic";

// Dynamically import heavy components
export const DynamicWeather = dynamic(
  () => import("../../cities/comp/weather"),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
    ),
    ssr: false,
  }
);

export const DynamicCityMap = dynamic(
  () => import("../../cities/comp/cityMap"),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    ),
    ssr: false,
  }
);

export const DynamicFacebook = dynamic(
  () => import("../../cities/comp/facebook"),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    ),
    ssr: false,
  }
);

export const DynamicTwitterFeed = dynamic(
  () => import("../../cities/comp/twitter"),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    ),
    ssr: false,
  }
);

export const DynamicInstagramFeed = dynamic(
  () => import("../../cities/comp/instagram"),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    ),
    ssr: false,
  }
);

export const DynamicNewsPage = dynamic(
  () => import("../../news/comp/newsPage"),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    ),
    ssr: false,
  }
);
