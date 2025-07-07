import { Landmark, GalleryHorizontal, Waves, Trees } from "lucide-react";
import Link from "next/link";

const ExploreHero = () => {
    const categories = [
      {
        name: "Lighthouses",
        icon: <Landmark size={32} className="text-white" />,
        href: "/lighthouses",
        color: "btn-info", // 🌊 Blue
      },
      {
        name: "Museums",
        icon: <GalleryHorizontal size={32} className="text-white" />,
        href: "/museum",
        color: "btn-success", // 🖼️ Green
      },
      {
        name: "Lakes",
        icon: <Waves size={32} className="text-white" />,
        href: "/lakes",
        color: "btn-warning", // 💧 Deep blue
      },
      {
        name: "Parks",
        icon: <Trees size={32} className="text-white" />,
        href: "/parks",
        color: "btn-secondary", // 🌳 Gold
      },
    ];
    

  return (
    <section className="bg-base-100 py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Discover Michigan's Treasures
      </h1>
      <p className="text-lg mb-8 text-base-content">
        From tranquil lakes to iconic landmarks, choose your next destination
        below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center md:mx-24">
        {categories.map(({ name, icon, href, color }) => (
          <Link key={name} href={href}>
            <div className={`btn ${color} flex flex-col items-center justify-center w-36 h-36 rounded-xl hover:scale-105 transition-transform duration-200`}>
              {icon}
              <span className="mt-2 font-semibold">{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExploreHero;
