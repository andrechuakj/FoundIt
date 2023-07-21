import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const MapDisplayOne = ({ coords }) => {
  const [viewport, setViewport] = useState({
    latitude: coords.latitude,
    longitude: coords.longitude,
    zoom: 17,
  });

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactMapGL
        mapLib={import("mapbox-gl")}
        initialViewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          color="red"
        ></Marker>
      </ReactMapGL>
    </div>
  );
};

export default MapDisplayOne;
