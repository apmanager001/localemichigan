'use client'
import React from 'react'
import { Map } from "@vis.gl/react-maplibre";
const HomepageMap = () => {
  return (
    <div className="h-[400px] overflow-hidden" id="map">
      <Map
        initialViewState={{
          longitude: -85.555,
          latitude: 44.7325,
          zoom: 5.2,
        }}
        // style={{ height: 450 }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        attributionControl={false}
      ></Map>
    </div>
  );
}

export default HomepageMap