import fs from "fs/promises";
import path from "path";
import City from '../comp/city'

export async function generateMetadata({ params }) {
  const cityName = params.id.toLowerCase().replace(/_/g, " ");
  const citiesPath = path.resolve(process.cwd(), "public/data/cities.json");
  const file = await fs.readFile(citiesPath, "utf-8");
  const cities = JSON.parse(file);
  const cityData = cities.find((c) => c.name.toLowerCase() === cityName);

  if (!cityData) {
    return {
      title: "Locale Michigan",
      description:
        "Explore Michigan cities—demographics, geography, and connections.",
    };
  }

  const {
    name,
    place,
    county,
    Population2020,
    landAreaSqMi,
    density,
    sister_cities,
    website,
  } = cityData;

  const description = `Explore ${name}, Michigan — a ${place} in ${county} County with a 2020 population of ${Population2020}, covering ${landAreaSqMi} sq mi and a density of ${density}. Learn about its sister city connection with ${
    sister_cities?.[0] || "international communities"
  } and access local resources.`;

  return {
    title: `${name} | Locale Michigan`,
    description,
    openGraph: {
      title: `${name}, Michigan`,
      description,
      images: ["https://localemichigan.com/city.webp"],
      url: `https://localemichigan.com/cities/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
const Page = () => {
  return (
    <div>
      <City />
    </div>
  )
}

export default Page