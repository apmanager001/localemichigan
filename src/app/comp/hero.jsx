import React from "react";

const Hero = () => {
  const image =
    "https://images.unsplash.com/photo-1602009983962-c524c03a28d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const divPosition = "w-1/3 h-2/3 z-50";

  return (
    <div className="relative lg:min-h-screen my-10 flex flex-col lg:flex-row">
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
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="relative w-full h-full grid grid-cols-4 grid-rows-4 border-8 border-white">
            {/* Generates 16 grid items */}
            {[...Array(16)].map((_, index) => (
              <div key={index} className="border-8 border-white"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex lg:hidden">
        <img src={image} alt="Image 3" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
