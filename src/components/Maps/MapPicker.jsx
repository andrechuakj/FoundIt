import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const MapPicker = ({selectedLocation, setSelectedLocation}) => {
  
  const [viewport, setViewport] = useState({
    latitude: 1.2967,
    longitude: 103.7764,
    zoom: 15,
  });

  const handleMapClick = (event) => {
    // Get the selected location's coordinates from the event
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    // Update the state with the selected location's coordinates
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactMapGL
        mapLib={import("mapbox-gl")}
        initialViewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          ></Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapPicker;
