import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  MapPin,
  Info,
  Mountain,
  Waves,
  Building2,
  Lightbulb,
} from "lucide-react";

const Header = () => {
  const navigation = [
    { name: "Cities", href: "/cities", icon: Building2 },
    { name: "Lighthouses", href: "/lighthouses", icon: Lightbulb },
    { name: "Lakes", href: "/lakes", icon: Waves },
    { name: "Parks", href: "/parks", icon: Mountain },
    { name: "Museums", href: "/museum", icon: Building2 },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white shadow-lg border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/icon.png"
                  alt="Locale Michigan"
                  fill
                  sizes="(max-width: 1024px) 40px, 48px"
                  className="object-contain group-hover:scale-105 transition-transform duration-200"
                  priority
                />
              </div>
              <div className="block">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Locale Michigan
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Discover the Great Lakes State
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Map button */}
            <Link
              href="#map"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <MapPin size={18} />
              <span>Map</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
              id="mobile-menu-button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Mobile Map button */}
          <Link
            href="#map"
            className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 mt-4"
          >
            <MapPin size={20} />
            <span>Interactive Map</span>
          </Link>
        </div>
      </div>

      {/* Client-side JavaScript for mobile menu */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const mobileMenuButton = document.getElementById('mobile-menu-button');
              const mobileMenu = document.getElementById('mobile-menu');
              const menuIcon = mobileMenuButton.querySelector('svg');
              
              mobileMenuButton.addEventListener('click', function() {
                const isOpen = mobileMenu.classList.contains('hidden');
                
                if (isOpen) {
                  mobileMenu.classList.remove('hidden');
                  menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
                } else {
                  mobileMenu.classList.add('hidden');
                  menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                }
              });
              
              // Close menu when clicking on a link
              const mobileLinks = mobileMenu.querySelectorAll('a');
              mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                  mobileMenu.classList.add('hidden');
                  menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                });
              });
            });
          `,
        }}
      />
    </header>
  );
};

export default Header;
