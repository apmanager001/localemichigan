import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Mountain,
  Waves,
  Building2,
  Lightbulb,
} from "lucide-react";
import heroImage from "./images/hero.webp";

const Hero = () => {
  const categories = [
    {
      name: "Cities",
      href: "/cities",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Lighthouses",
      href: "/lighthouses",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Lakes",
      href: "/lakes",
      icon: Waves,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Parks",
      href: "/parks",
      icon: Mountain,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Michigan landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <MapPin size={16} />
              <span>Discover the Great Lakes State</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Explore
                <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Michigan
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                Discover vibrant cities, stunning lighthouses, serene parks,
                fascinating museums, and breathtaking lakes. Your Michigan
                adventure starts here!
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cities"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Exploring
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#map"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                View Interactive Map
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">
                  500+
                </div>
                <div className="text-sm text-gray-300">Cities & Towns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  120+
                </div>
                <div className="text-sm text-gray-300">Lighthouses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">
                  11,000+
                </div>
                <div className="text-sm text-gray-300">Inland Lakes</div>
              </div>
            </div>
          </div>

          {/* Right Column - Category Cards */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={28} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {category.name}
                      </h3>
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full group-hover:w-12 transition-all duration-300"></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/70 animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Category Cards */}
      <div className="lg:hidden absolute bottom-20 left-0 right-0 z-10 px-4">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
