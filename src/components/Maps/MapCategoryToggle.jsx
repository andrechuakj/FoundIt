import React from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const MapCategoryToggle = ({ setMapCategory }) => {
  const dropdownStyle = {
    background: "white",
    border: "white",
    color: "black",
  };
  return (
    <>
      <ToggleButtonGroup type="radio" name="mapCategory" defaultValue={"all"}>
        <ToggleButton
          id="mapAll"
          value={"all"}
          onClick={() => setMapCategory("all")}
        >
          All
        </ToggleButton>
        <ToggleButton
          id="mapLost"
          value={"maplost"}
          onClick={() => setMapCategory("lost")}
        >
          Lost items
        </ToggleButton>
        <ToggleButton
          id="mapFound"
          value={"mapfound"}
          onClick={() => setMapCategory("found")}
        >
          Found items
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default MapCategoryToggle;
