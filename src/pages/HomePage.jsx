import React from "react";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemTabs from "../components/ItemTabs";

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
          <ItemTabs searchKey={searchKey} />
          <br />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
