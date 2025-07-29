"use client";
import React, { useState, useEffect } from "react";
import {
  Map,
  NavigationControl,
  GeolocateControl,
} from "@vis.gl/react-maplibre";
import { Navigation, Compass } from "lucide-react";

const HomepageMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMapLoad = (event) => {
    setIsLoaded(true);
  };

  return (
    <section
      className="relative bg-gradient-to-br from-blue-50 to-green-50 py-16"
      id="map"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Michigan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the diverse cities and communities that make Michigan
            special. From the bustling metropolis of Detroit to the serene
            shores of the Upper Peninsula.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* Map */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Loading Michigan Map...
                  </p>
                </div>
              </div>
            )}

            <Map
              initialViewState={{
                longitude: -85.555,
                latitude: 44.7325,
                zoom: 5.2,
                pitch: 0,
                bearing: 0,
              }}
              mapStyle="https://tiles.openfreemap.org/styles/positron"
              attributionControl={false}
              style={{ width: "100%", height: "100%" }}
              onLoad={handleMapLoad}
            >
              {/* Navigation Controls */}
              <NavigationControl
                position="top-right"
                showCompass={true}
                showZoom={true}
                visualizePitch={true}
              />

              {/* Geolocate Control */}
              <GeolocateControl
                position="top-right"
                trackUserLocation={false}
                showUserHeading={true}
                showUserLocation={true}
              />
            </Map>
          </div>

          {/* Map Info Panel */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <Compass size={16} className="text-blue-600" />
              <h3 className="font-semibold text-gray-900 text-sm">
                Michigan Overview
              </h3>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• Interactive map of Michigan</div>
              <div>• Navigate and explore the state</div>
              <div>• Use controls to zoom and pan</div>
            </div>
          </div>

          {/* Map Controls Info */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Navigation size={14} className="text-blue-600" />
              <span>Use controls to navigate</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">83</div>
            <div className="text-gray-600">Counties</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">10M+</div>
            <div className="text-gray-600">Michigan Residents</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              96,716
            </div>
            <div className="text-gray-600">Square Miles</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageMap;
