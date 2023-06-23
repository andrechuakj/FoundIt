import { Link } from "react-router-dom";
import React from "react";
import PersonalItemTabs from "../components/PersonalItemTabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../components/NavigationBar";
import ProfileBar from "../components/ProfileBar";

const ViewPersonalListings = () => {
  const [searchPersonalKey, setSearchPersonalKey] = React.useState("");

  return (
    <>
      <Row className="justify-content-md-center">
        <Col lg="8">
          <div>
            <NavigationBar
              searchKey={searchPersonalKey}
              setSearchKey={setSearchPersonalKey}
            />
          </div>
          <hr />
          <ProfileBar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <PersonalItemTabs searchPersonalKey={searchPersonalKey} />
          <br />
        </Col>
      </Row>
    </>
  );
};

export default ViewPersonalListings;
