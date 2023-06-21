import React, { useState } from "react";
import logoOnly from "../assets/LogoOnly.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import messageIcon from "../assets/message icon.png";
import ReportItemModal from "./ReportItemModal";

const NavigationBar = ({ searchKey, setSearchKey }) => {
  const [dropdownHovered, setDropdownHovered] = useState(false);
  const [messageHovered, setMessageHovered] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  const dropdownStyle = {
    display: "inline-block",
    position: "relative",
    backgroundColor: dropdownHovered ? "rgba(0, 0, 0, 0.3)" : "transparent",
    transition: "0.3s",
    borderRadius: "10px",
  };

  const messageStyle = {
    display: "inline-block",
    position: "relative",
    backgroundColor: messageHovered ? "rgba(0, 0, 0, 0.3)" : "transparent",
    transition: "0.3s",
    borderRadius: "10px",
    padding: "3px",
  };

  const handleHoverDropdown = () => {
    setDropdownHovered(true);
  };

  const handleLeaveDropdown = () => {
    setDropdownHovered(false);
  };

  const handleHoverMessage = () => {
    setMessageHovered(true);
  };

  const handleLeaveMessage = () => {
    setMessageHovered(false);
  };
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/home-page">
            <img
              alt=""
              src={logoOnly}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/main-page">
            <Navbar.Text style={{ fontSize: 33, fontWeight: "bold" }}>
              FoundIt
            </Navbar.Text>
          </Navbar.Brand>
          <Form.Control
            className="ms-3 me-3"
            placeholder="Search for item or location..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <div className="vr" />
          <Navbar.Collapse>
            <Nav style={{ padding: "4px" }}>
              <div
                style={dropdownStyle}
                onMouseEnter={handleHoverDropdown}
                onMouseLeave={handleLeaveDropdown}
              >
                <NavDropdown title="Welcome, user">
                  <NavDropdown.Item href="#action/3.1">
                    View listings
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/home-page/edit-profile">
                    Edit profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/home-page/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
            <Navbar.Brand
              style={messageStyle}
              onMouseEnter={handleHoverMessage}
              onMouseLeave={handleLeaveMessage}
              href="/main-page"
            >
              <img
                src={messageIcon}
                alt="messages"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Navbar.Collapse>
          <Button
            variant="outline-danger"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => setOpenReportModal(true)}
          >
            Report item
          </Button>
        </Container>
      </Navbar>
      <ReportItemModal
        openReportModal={openReportModal}
        setOpenReportModal={setOpenReportModal}
      />
    </>
  );
};

export default NavigationBar;

/*
  <Button variant="outline-danger">
    <Link to="/home-page/LostFoundItemForm" className="uploadButton">Upload</Link>
  </Button>
*/