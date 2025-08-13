"use client";

import React, { useState } from "react";
import { Map, Marker } from "@vis.gl/react-maplibre";
import { Plus, Minus } from "lucide-react";

const LocationMap = ({
  coordinate,
  heightClass = "h-80",
  zoom: initialZoom = 9,
}) => {
  const hasCoord =
    coordinate &&
    typeof coordinate.latitude === "number" &&
    typeof coordinate.longitude === "number";

  const [zoom, setZoom] = useState(initialZoom);

  if (!hasCoord) return null;

  const { latitude, longitude, name } = coordinate;
  console.log(latitude, longitude, name);
  return (
    <div
      className={`w-full ${heightClass} overflow-hidden relative rounded-lg border border-gray-200`}
      id="map"
    >
      <Map
        initialViewState={{ longitude, latitude, zoom }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <Marker longitude={longitude} latitude={latitude}>
          <div className="relative group cursor-pointer">
            <span className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-red-500/40 animate-ping" />
            <span className="relative z-10 inline-block h-4 w-4 rounded-full bg-red-600 ring-2 ring-white shadow" />
            <div className="absolute bottom-6 z-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-xs text-black rounded shadow opacity-0 group-hover:opacity-100 transition">
              {name && <div>{name}</div>}
              <div className="text-[10px] text-gray-600">
                {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </div>
            </div>
          </div>
        </Marker>
      </Map>

      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        <button
          onClick={() => setZoom((z) => Math.min(z + 1, 16))}
          aria-label="Zoom In"
          className="p-2 bg-white hover:bg-gray-100 rounded shadow-md"
        >
          <Plus />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 1, 3))}
          aria-label="Zoom Out"
          className="p-2 bg-white hover:bg-gray-100 rounded shadow-md"
        >
          <Minus />
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
