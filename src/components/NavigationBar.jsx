import React, { useState, useContext } from "react";
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
import { UserContext } from "../contexts/UserContext";

const NavigationBar = ({ searchKey, setSearchKey }) => {
  const [dropdownHovered, setDropdownHovered] = useState(false);
  const [messageHovered, setMessageHovered] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { user } = useContext(UserContext);
  const userName = `Welcome, ${user.name}`;

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchKey(value);
    setShowDeleteButton(value.length > 0);
  };

  const handleDeleteClick = () => {
    setSearchKey("");
    setShowDeleteButton(false);
  };
  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#57e2fa",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Container fluid style={{ position: "relative" }}>
          <Navbar.Brand href="/home-page">
            <img
              alt=""
              src={logoOnly}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/home-page">
            <Navbar.Text style={{ fontSize: 33, fontWeight: "bold" }}>
              FoundIt
            </Navbar.Text>
          </Navbar.Brand>

          <Form.Control
            className="mx-auto"
            placeholder="Search for item or location..."
            value={searchKey}
            onChange={handleInputChange}
          />
          {showDeleteButton && (
            <Button
              className="delete-button"
              onClick={handleDeleteClick}
              style={{
                position: "absolute",
                right: "341px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              &#x2716;
            </Button>
          )}

          <div className="vr ms-3" />
          <Navbar.Collapse>
            <Nav style={{ padding: "4px" }}>
              <div
                style={dropdownStyle}
                onMouseEnter={handleHoverDropdown}
                onMouseLeave={handleLeaveDropdown}
              >
                <NavDropdown title={userName}>
                  <NavDropdown.Item href="/home-page/view-personal-listings">
                    View listings
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/home-page/edit-profile">
                    Edit profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/home-page/logout">
                    Logout
                  </NavDropdown.Item>
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
            variant="danger"
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
