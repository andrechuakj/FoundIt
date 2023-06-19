import React from "react";
import ItemView from "../components/ItemView";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col lg="8">
          <div>
            <NavigationBar />
          </div>
          <hr />
          <FilterBar />
          <br />
          <div>
            <ItemView />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
