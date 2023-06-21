import React from "react";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  const [searchKey, setSearchKey] = React.useState("");

  return (
    <>
      <Row className="justify-content-md-center">
        <Col lg="8">
          <div>
            <NavigationBar searchKey={searchKey} setSearchKey={setSearchKey} />
          </div>
          <hr />
          <FilterBar searchKey={searchKey} />
          <br />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
