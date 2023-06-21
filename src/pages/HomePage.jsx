import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ItemView from "../components/ItemView";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
    {user ? `${user.contact}, ${user.email}, ${user.password}` : 'no user'}
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
