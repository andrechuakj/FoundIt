import React from "react";
import logoOnly from "../assets/LogoOnly.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logoOnly}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Text style={{ fontSize: 33, fontWeight: "bold" }}>
            FoundIt
          </Navbar.Text>
          <Form.Control
            className="ms-3 me-1"
            placeholder="Search for any item..."
          />
          <Button className="mx-2" variant="outline-success">
            Search
          </Button>{" "}
          <div className="vr" />
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title="Welcome, user" menuVariant="dark">
                <NavDropdown.Item href="#action/3.1">
                  View listings
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-danger">Upload</Button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
