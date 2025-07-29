import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Building2,
  Lightbulb,
  Mountain,
  Waves,
  Info,
  Mail,
  ExternalLink,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    explore: [
      { name: "Cities", href: "/cities", icon: Building2 },
      { name: "Lighthouses", href: "/lighthouses", icon: Lightbulb },
      { name: "Parks", href: "/parks", icon: Mountain },
      { name: "Lakes", href: "/lakes", icon: Waves },
      { name: "Museums", href: "/museum", icon: Building2 },
    ],
    about: [
      { name: "About Us", href: "/about", icon: Info },
      { name: "Contact", href: "mailto:contact@localemichigan.com", icon: Mail },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/icon.png"
                  alt="Locale Michigan"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Locale Michigan
                </h3>
                <p className="text-sm text-gray-600">
                  Discover the Great Lakes State
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your comprehensive guide to Michigan's cities, parks, lakes,
              lighthouses, and museums. Explore the rich culture and natural
              beauty of the Great Lakes State.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Heart className="w-4 h-4 mr-1 text-red-500" />
              <span>Made with love for Michigan</span>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              Explore Michigan
            </h4>
            <ul className="space-y-3">
              {navigation.explore.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-3">
              {navigation.about.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
                      <span className="text-sm">{item.name}</span>
                      {item.href.startsWith("mailto:") && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Info Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                <a
                  href="mailto:contact@localemichigan.com"
                  className="text-sm hover:text-blue-600 transition-colors duration-200"
                >
                  contact@localemichigan.com
                </a>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>Have suggestions or want to share your Michigan story?</p>
                <p className="mt-2">We'd love to hear from you!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © {currentYear} Locale Michigan. All rights reserved.
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/cities"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Cities
              </Link>
              <Link
                href="/parks"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Parks
              </Link>
              <a
                href="mailto:contact@localemichigan.com"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500">
              <p>
                Locale Michigan is your gateway to discovering the beauty,
                culture, and communities of the Great Lakes State. From bustling
                cities to serene lakes, historic lighthouses to pristine parks,
                we're here to help you explore everything Michigan has to offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
