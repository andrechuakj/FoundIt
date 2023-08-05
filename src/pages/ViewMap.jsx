import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Row, Col } from "react-bootstrap";
import MapDisplayAll from "../components/Maps/MapDisplayAll";
import MapCategoryToggle from "../components/Maps/MapCategoryToggle";

const ViewMap = () => {
  const [mapCategory, setMapCategory] = React.useState("all");

  return (
    <>
      <Row
        className="justify-content-md-center"
        style={{ height: "100vh", width: "100%", margin: "0px" }}
      >
        <Col
          xxl="8"
          xl="9"
          lg="10.5"
          md="11"
          style={{
            border: "1px solid lightgrey",
            boxShadow: "0 0 10px black",
            backgroundColor: "white",
          }}
        >
          <NavigationBar />
          <hr />
          <div
            style={{
              display: "inline-block",
              marginBottom: "5px",
            }}
          >
            <MapCategoryToggle setMapCategory={setMapCategory} />
          </div>
          <MapDisplayAll mapCategory={mapCategory} />
        </Col>
      </Row>
    </>
  );
};

export default ViewMap;
