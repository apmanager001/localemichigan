"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Plus, Minus, Expand, Pin } from "lucide-react";
import { Map, Marker } from "@vis.gl/react-maplibre";

const CityMap = ({ lat, lon }) => {
  const [zoom, setZoom] = useState(15);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 10));
  };
  useEffect(() => {
    setZoom(15);
  }, [lat]);

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 0));
  };

  return (
    <div
      className={`h-96 w-full  overflow-hidden  relative `}
      id='map'
    >
      <Map
        key={`${lat}-${lon}-${zoom}`}
        initialViewState={{
          longitude: lon,
          latitude: lat,
          zoom: zoom,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        attributionControl={false}
      >
        <Marker longitude={lon} latitude={lat}>
          <div>
            <Pin size={24} color="#ff0000" fill="#ff0000" />
          </div>
        </Marker>
      </Map>
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white hover:bg-gray-100 rounded shadow-md"
        >
          <Plus />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white hover:bg-gray-100 rounded shadow-md"
        >
          <Minus />
        </button>
      </div>
    </div>
  );
};

export default CityMap;
