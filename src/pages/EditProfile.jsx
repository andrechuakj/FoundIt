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
