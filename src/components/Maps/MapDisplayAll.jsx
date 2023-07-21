import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const MapDisplayAll = () => {
  const [viewport, setViewport] = useState({
    latitude: 1.2967,
    longitude: 103.7764,
    zoom: 15,
  });

  return (
    <div style={{ width: "100%", height: "calc(100% - 150px)" }}>
      <ReactMapGL
        mapLib={import("mapbox-gl")}
        initialViewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        markers here
      </ReactMapGL>
    </div>
  );
};

export default MapDisplayAll;
