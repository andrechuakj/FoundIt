import React, { useContext, useEffect } from "react";
import {
  FloatingLabel,
  Button,
  Form,
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Tab,
} from "react-bootstrap";
import profilePic from "../assets/profile pic.jpeg";
import { UserContext } from "../contexts/UserContext";

const EditProfileForm = () => {
  const [picSelected, setPicSelected] = React.useState(false);
  const [nameChanged, setNameChanged] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [newPasswordsMatch, setNewPasswordsMatch] = React.useState(true);
  const [oldPasswordsMatch, setOldPasswordsMatch] = React.useState(true);
  const { user } = useContext(UserContext);
  const [passwordChanged, setPasswordChanged] = React.useState(false);
  const [usernameChanged, setUsernameChanged] = React.useState(false);
  const [uploadedPhoto, setUploadedPhoto] = React.useState(false);
  //const userEmail = `${user.email}`;
  //const userName = `${user.name}`;

  const picSubmitted = React.useRef(null);
  const nameSubmitted = React.useRef(null);
  const oldPassword = React.useRef("");
  const newPassword = React.useRef("");
  const confirmPassword = React.useRef("");

  const tabPaneStyle = {
    border: "1px solid",
    borderRadius: "10px",
    borderColor: "#c9c9c9",
    padding: "30px",
    boxShadow: "2px 2px lightgrey",
  };

  //When save button is clicked after uploading pic
  const handlePicSubmit = (event) => {
    event.preventDefault();
    setUploadedPhoto(true);

    //for logging
    const selectedFile = picSubmitted.current.files[0];
    console.log(selectedFile);

    //do backend stuff here
  };

  //For displaying new profile pic after upload
  const handleFileChange = (event) => {
    setPicSelected(true);
    //for displaying selected image
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //For displaying save button when a new username is typed
  const handleNameChange = (event) => {
    if (
      nameSubmitted.current.value == "TODO${user.name}" ||
      nameSubmitted.current.value == ""
    ) {
      setNameChanged(false);
    } else {
      setNameChanged(true);
    }
  };

  //For submitting username after save button is clicked
  const handleNameSubmit = (event) => {
    event.preventDefault();
    setUsernameChanged(true);
    console.log(nameSubmitted.current.value);

    //backend here
  };

  //For validating whether old password is correct
  const handleOldPasswordChange = () => {
    if (
      oldPassword.current.value === "TODO${user.password}" &&
      oldPassword.current.value != ""
    ) {
      console.log("old passwords correct");
      setOldPasswordsMatch(true);
      // Proceed with form submission or further logic
    } else {
      console.log("old passwords dont match");
      setOldPasswordsMatch(false);
    }
  };

  //For validating whether new passwords match
  const handleConfirmPasswordChange = () => {
    if (
      newPassword.current.value === confirmPassword.current.value &&
      newPassword.current.value != ""
    ) {
      setNewPasswordsMatch(true);
      // Proceed with form submission or further logic
    } else {
      setNewPasswordsMatch(false);
    }
  };

  //For submitted password after save button is clicked
  const handleSubmitPassword = (e) => {
    const form = e.currentTarget;
    if (
      oldPassword.current.value == "" ||
      newPasswordsMatch === false ||
      oldPasswordsMatch === false
    ) {
      e.preventDefault();
      e.stopPropagation();
      console.log("cannot submit");
      return;
    }

    console.log("submitted");
    setPasswordChanged(true);
    //do backend stuff here
  };

  return (
    <>
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey="#editProfile"
      >
        <Row>
          <Col sm={3}>
            <ListGroup>
              <ListGroup.Item action href="#editProfile">
                Edit Profile Details
              </ListGroup.Item>
              <ListGroup.Item action href="#changePassword">
                Change Password
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#editProfile" style={tabPaneStyle}>
                <h2>Edit Profile Details</h2>
                <br />
                <br />
                <h3>Profile Picture</h3>
                <Row>
                  <Col sm={3}>
                    <Container>
                      <Image
                        src={picSelected ? selectedImage : profilePic}
                        alt="profile pic"
                        roundedCircle
                        style={{
                          border: "3px solid white",
                          height: "150px",
                          width: "150px",
                        }}
                      />
                    </Container>
                  </Col>
                  <Col sm={9}>
                    <Container>
                      <form>
                        <Form.Group
                          style={{
                            border: "1px solid lightgrey",
                            padding: "3px",
                            borderRadius: "4px",
                            display: "inline-block",
                            marginBottom: "10px",
                          }}
                        >
                          <label
                            style={{
                              borderRadius: "8px",
                              padding: "8px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <input
                              type="file"
                              name="Upload a photo"
                              accept="image/*"
                              style={{ display: "none" }}
                              ref={picSubmitted}
                              onChange={handleFileChange}
                            />
                            Upload a photo
                          </label>
                        </Form.Group>
                        <br />
                        {picSelected && !uploadedPhoto && (
                          <Button type="submit" onClick={handlePicSubmit}>
                            Save
                          </Button>
                        )}
                        {picSelected && uploadedPhoto && (
                          <Button variant="outline-success" disabled>
                            Saved
                          </Button>
                        )}
                      </form>
                    </Container>
                  </Col>
                </Row>
                <br />
                <hr />
                <br />
                <h3>Public profile</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="profileEmail">
                    <FloatingLabel
                      controlId="profileEmailLabel"
                      label="Email address"
                      className="mb-3"
                    >
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={"TODO${user.email}"}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="profileUsername">
                    <FloatingLabel
                      controlId="profileUsernameLabel"
                      label="Username"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        defaultValue={"TODO${user.name}"}
                        ref={nameSubmitted}
                        onChange={handleNameChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  {nameChanged && !usernameChanged && (
                    <Button type="submit" onClick={handleNameSubmit}>
                      Save
                    </Button>
                  )}
                  {nameChanged && usernameChanged && (
                    <Button variant="outline-success" disabled>
                      Saved
                    </Button>
                  )}
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="#changePassword" style={tabPaneStyle}>
                <h2>Change Password</h2>
                <br />
                <br />
                <Form noValidate>
                  <Form.Group className="mb-3" controlId="profileOldPassword">
                    <FloatingLabel
                      controlId="profileOldPasswordLabel"
                      label="Old Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Old Password"
                        ref={oldPassword}
                        isInvalid={!oldPasswordsMatch}
                        onChange={handleOldPasswordChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password is wrong
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="profileNewPassword">
                    <FloatingLabel
                      controlId="profileNewPasswordLabel"
                      label="New Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        ref={newPassword}
                        isInvalid={!newPasswordsMatch}
                        onChange={handleConfirmPasswordChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="profileConfirmPassword"
                  >
                    <FloatingLabel
                      controlId="profileConfirmPasswordLabel"
                      label="Confirm New Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Confirm New Password"
                        ref={confirmPassword}
                        isInvalid={!newPasswordsMatch}
                        onChange={handleConfirmPasswordChange}
                      />
                      {!newPasswordsMatch &&
                        confirmPassword.current.value != "" && (
                          <Form.Control.Feedback type="invalid">
                            Passwords do not match
                          </Form.Control.Feedback>
                        )}
                      {confirmPassword.current.value == "" && (
                        <Form.Control.Feedback type="invalid">
                          Please confirm your password
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                  {!passwordChanged &&
                    oldPasswordsMatch &&
                    newPasswordsMatch && (
                      <Button type="submit" onClick={handleSubmitPassword}>
                        Save
                      </Button>
                    )}
                  {passwordChanged && (
                    <Button variant="outline-success" disabled>
                      Saved
                    </Button>
                  )}
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default EditProfileForm;
