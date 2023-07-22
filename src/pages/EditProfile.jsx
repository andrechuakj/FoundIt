import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../components/NavigationBar";
import ProfileBar from "../components/ProfileBar";
import EditProfileForm from "../components/EditProfileForm";

export default function EditProfile() {
  const [fakeKey, setFakeKey] = React.useState("");

  return (
    <>
      <Row
        className="justify-content-md-center"
        xxl
        style={{ height: "100vh", width: "100vw" }}
      >
        <Col
          lg="8"
          style={{
            border: "1px solid lightgrey",
            boxShadow: "0 0 10px black",
            backgroundColor: "white",
          }}
        >
          <div>
            <NavigationBar searchKey={fakeKey} setSearchKey={setFakeKey} />
          </div>
          <hr />
          <ProfileBar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <EditProfileForm />
        </Col>
      </Row>
    </>
  );
}
