import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ItemModal from "../ItemModal";

const MapDisplayAll = ({ mapCategory }) => {
  const [mapLostItems, setMapLostItems] = useState([]);
  const [mapFoundItems, setMapFoundItems] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [lostOrFound, setLostOrFound] = useState(null);
  const [itemToShow, setItemToShow] = React.useState({
    id: null,
    founder: null,
    owner: null,
    returned: null,
    dateReported: null,
    itemName: null,
    itemPicture: null,
    colour: null,
    location: null,
    coordinates: null,
  });
  const [viewport, setViewport] = useState({
    latitude: 1.2967,
    longitude: 103.7764,
    zoom: 15,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "lostItems"));
        const items = snapshot.docs.map((doc) => doc.data());
        setMapLostItems(
          items
            .filter((item) => !item.returned)
            .filter((item) => item.coordinates)
        );
      } catch (error) {
        // Handle any potential errors
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "foundItems"));
        const items = snapshot.docs.map((doc) => doc.data());
        setMapFoundItems(
          items
            .filter((item) => !item.returned)
            .filter((item) => item.coordinates)
        );
      } catch (error) {
        // Handle any potential errors
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);

  const handleLostItemClick = (item) => {
    setLostOrFound("lost");
    setItemToShow(item);
    setModalShow(true);
  };

  const handleFoundItemClick = (item) => {
    setLostOrFound("found");
    setItemToShow(item);
    setModalShow(true);
  };

  return (
    <>
      <ItemModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={itemToShow}
        lostOrFound={lostOrFound}
        isPersonalView={false}
      />
      <div style={{ width: "100%", height: "calc(100% - 150px)" }}>
        <ReactMapGL
          mapLib={import("mapbox-gl")}
          initialViewState={viewport}
          mapboxAccessToken={import.meta.env.VITE_API_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {(mapCategory == "all" || mapCategory == "lost") &&
            mapLostItems.map((item) => (
              <Marker
                latitude={item.coordinates.latitude}
                longitude={item.coordinates.longitude}
                key={item.id}
                color="red"
              >
                <button
                  style={{ border: "1px solid grey" }}
                  onClick={() => handleLostItemClick(item)}
                >
                  <img
                    src={item.itemPicture}
                    alt="Item picture"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </button>
              </Marker>
            ))}
          {(mapCategory == "all" || mapCategory == "found") &&
            mapFoundItems.map((item) => (
              <Marker
                latitude={item.coordinates.latitude}
                longitude={item.coordinates.longitude}
                key={item.id}
                color="red"
              >
                <button
                  style={{ border: "1px solid grey" }}
                  onClick={() => handleFoundItemClick(item)}
                >
                  <img
                    src={item.itemPicture}
                    alt="Item picture"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </button>
              </Marker>
            ))}
        </ReactMapGL>
      </div>
    </>
  );
};

export default MapDisplayAll;
