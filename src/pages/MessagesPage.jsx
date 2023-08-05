import React from "react";
import MessageContainer from "../components/MessagePage/MessageContainer";
import { Row, Col } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

const MessagesPage = () => {
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
          <MessageContainer />
        </Col>
      </Row>
    </>
  );
};

export default MessagesPage;
