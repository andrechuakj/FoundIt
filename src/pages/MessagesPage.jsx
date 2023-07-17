import React from "react";
import MessageContainer from "../components/MessagePage/MessageContainer";
import { Row, Col } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

const MessagesPage = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col
          lg="8"
          style={{
            border: "1px solid lightgrey",
            boxShadow: "0 0 10px black",
            backgroundColor: "white",
            height: "100vh",
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
