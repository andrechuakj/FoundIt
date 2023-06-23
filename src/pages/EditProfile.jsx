import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import ProfileBar from "../components/ProfileBar";
import EditProfileForm from "../components/EditProfileForm";

export default function EditProfile() {
  const [fakeKey, setFakeKey] = React.useState("");

  return (
    <>
      <Row className="justify-content-md-center">
        <Col lg="8">
          <div>
            <NavigationBar searchKey={fakeKey} setSearchKey={setFakeKey} />
          </div>
          <br />
          <EditProfileForm />
        </Col>
      </Row>
    </>
  );
}
