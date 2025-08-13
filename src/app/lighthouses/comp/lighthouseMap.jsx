"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Plus, Minus } from "lucide-react";
import { Map, Marker } from "@vis.gl/react-maplibre";

const LighthouseMap = ({ coordinates }) => {
  const [zoom, setZoom] = useState(6); // wider zoom for multiple points
  const [selectedKey, setSelectedKey] = useState(null);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 1, 15));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 1, 3));

  const center = coordinates.length
    ? { lat: coordinates[0].latitude, lon: coordinates[0].longitude }
    : { lat: 44.5, lon: -84.5 }; // fallback center for Michigan

  return (
    <div
      className="h-96 w-full  overflow-hidden relative my-10 md:my-0"
      id="map"
    >
      <Map
        key={`22`}
        initialViewState={{
          longitude: -85.555,
          latitude: 44.7325,
          zoom: 4.8,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        attributionControl={false}
      >
        {coordinates.map((point) => {
          const key = `${point.name}-${point.latitude}-${point.longitude}`;
          const isSelected = selectedKey === key;
          return (
            <Marker
              key={key}
              longitude={point.longitude}
              latitude={point.latitude}
            >
              <div
                className="relative group cursor-pointer"
                onClick={() => setSelectedKey(isSelected ? null : key)}
              >
                {isSelected && (
                  <span className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-red-500/40 animate-ping" />
                )}
                <span className="relative z-10 inline-block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white shadow" />

                {/* 🏷️ Tooltip */}
                <div className="absolute bottom-6 z-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-xs text-black rounded shadow opacity-0 group-hover:opacity-100 transition">
                  {point.name}
                </div>
              </div>
            </Marker>
          );
        })}
      </Map>

      {/* Zoom Controls */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        <button
          onClick={handleZoomIn}
          aria-label="Zoom In"
          className="p-2 bg-white hover:bg-gray-100 rounded shadow-md"
        >
          <Plus />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Zoom Out"
          className="p-2 bg-white hover:bg-gray-100 rounded shadow-md"
        >
          <Minus />
        </button>
      </div>
    </div>
  );
};
export default LighthouseMap;
