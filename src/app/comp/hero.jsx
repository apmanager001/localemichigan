import React from "react";
import Image from 'next/image'
import heroImage from "./images/hero.webp";

const Hero = () => {
 
  const divPosition = "w-1/3 h-2/3 z-50";
  return (
    <div className="relative lg:min-h-screen mb-10 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-8 flex items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">Explore Michigan</h1>
          <p className="text-lg leading-relaxed">
            Discover vibrant cities, stunning lighthouses, serene parks,
            fascinating museums, and breathtaking lakes. Your Michigan adventure
            starts here!
          </p>
        </div>
      </div>

      <div className="w-3/4 hidden lg:flex justify-center items-center gap-3 relative overflow-hidden">
        <div
          className={`w-full table absolute h-full bg-cover bg-center border-collapse box-border lg:bg-center md:bg-[position:25%_center]`}
          // style={{
          //   backgroundImage: `url('/hero.webp')`,
          // }}
          style={{ position: "relative", height: "100vh", width: "100%" }}
        >
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            style={{ objectFit: "cover", zIndex: -1 }}
          />
          <div className="relative w-full h-full grid grid-cols-4 grid-rows-4 border-8 border-white">
            {/* Generates 16 grid items */}
            {[...Array(16)].map((_, index) => (
              <div key={index} className="border-8 border-white"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex lg:hidden">
        <Image src={heroImage} alt="Image 3" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
