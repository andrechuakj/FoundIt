import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Form, Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Logout() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <form
        style={{
          boxShadow: "2px 2px 2px lightgrey",
          padding: "30px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <h4 className="log-in-sign-up-title">Log out?</h4>
        <br />
        <Button onClick={handleLogout}>Log out</Button>{" "}
        <Button variant="outline-danger" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
}
