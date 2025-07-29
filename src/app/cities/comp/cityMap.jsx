"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Plus, Minus, Expand, Pin, Navigation } from "lucide-react";
import { Map, Marker } from "@vis.gl/react-maplibre";

const CityMap = ({ lat, lon }) => {
  const [zoom, setZoom] = useState(15);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 10));
  };

  useEffect(() => {
    setZoom(15);
  }, [lat]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg">
      <Map
        key={`${lat}-${lon}-${zoom}`}
        initialViewState={{
          longitude: lon,
          latitude: lat,
          zoom: zoom,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        attributionControl={false}
        className="rounded-lg"
      >
        <Marker longitude={lon} latitude={lat}>
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Pin size={16} color="white" fill="white" />
            </div>
          </div>
        </Marker>
      </Map>

      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-lg transition-colors duration-200 border border-gray-200"
          title="Zoom In"
        >
          <Plus size={16} className="text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-lg transition-colors duration-200 border border-gray-200"
          title="Zoom Out"
        >
          <Minus size={16} className="text-gray-700" />
        </button>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Navigation size={14} />
          <span>Zoom: {zoom}</span>
        </div>
      </div>

      {/* Coordinates Info */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600">
          <div>Lat: {lat.toFixed(4)}</div>
          <div>Lon: {lon.toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;
