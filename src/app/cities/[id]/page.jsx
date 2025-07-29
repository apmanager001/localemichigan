import fs from "fs/promises";
import path from "path";
import City from "../comp/city";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cityName = resolvedParams.id.toLowerCase().replace(/_/g, " ");
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

  // Create description with null checks
  const populationText = Population2020
    ? `${Population2020.toLocaleString()}`
    : "available population data";
  const areaText = landAreaSqMi
    ? `${landAreaSqMi} sq mi`
    : "available area data";
  const densityText = density
    ? `${density} people/sq mi`
    : "available density data";
  const countyText = Array.isArray(county)
    ? county.join(", ")
    : county || "Michigan";
  const placeText = place || "community";
  const sisterCityText = sister_cities?.[0] || "international communities";

  const description = `Explore ${name}, Michigan — a ${placeText} in ${countyText} County with a 2020 population of ${populationText}, covering ${areaText} and a density of ${densityText}. Learn about its sister city connection with ${sisterCityText} and access local resources.`;

  return {
    title: `${name} | Locale Michigan`,
    description,
    keywords: [
      `${name} Michigan`,
      `${name} demographics`,
      `${name} population`,
      `${name} county`,
      `${name} Michigan attractions`,
      `${name} Michigan information`,
      `${countyText} County Michigan`,
      "Michigan cities",
    ],
    openGraph: {
      title: `${name}, Michigan`,
      description,
      images: ["https://localemichigan.com/city.webp"],
      url: `https://localemichigan.com/cities/${resolvedParams.id}`,
      siteName: "Locale Michigan",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}, Michigan`,
      description,
      images: ["https://localemichigan.com/city.webp"],
    },
    alternates: {
      canonical: `https://localemichigan.com/cities/${resolvedParams.id}`,
    },
  };
}

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const cityId = resolvedParams.id;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "City",
            name: cityId.replace(/_/g, " "),
            url: `https://localemichigan.com/cities/${cityId}`,
            description: `Information about ${cityId.replace(
              /_/g,
              " "
            )}, Michigan including demographics, geography, and local resources`,
            addressRegion: "Michigan",
            addressCountry: "US",
            sameAs: [`https://localemichigan.com/cities/${cityId}`],
          }),
        }}
      />
      <City />
    </div>
  );
};

export default Page;
