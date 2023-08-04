import React, { useContext, useEffect, useState } from "react";
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
  Alert,
} from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const EditProfileForm = () => {
  const [picSelected, setPicSelected] = React.useState(false);
  const [nameChanged, setNameChanged] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [passwordChanged, setPasswordChanged] = React.useState(false);
  const [usernameChanged, setUsernameChanged] = React.useState(false);
  const [uploadedPhoto, setUploadedPhoto] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const { user } = useContext(UserContext);
  const userEmail = `${user.email}`;
  const userID = `${user.id}`;
  const [profilePic, setProfilePic] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const picSubmitted = React.useRef(null);
  const nameSubmitted = React.useRef(null);
  const newPassword = React.useRef("");
  const oldPassword = React.useRef("");
  const [error, setError] = useState("");

  const [credential, setCredential] = useState(null);

  const fetchDocument = async (docId) => {
    try {
      const docRef = doc(db, "users", docId);
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        setProfilePic(documentData.profilePic);
        setUserName(documentData.name);
        setIsLoading(false);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log("Error fetching document:", error);
    }
  };

  useEffect(() => {
    fetchDocument(userID);
  }, []);

  const tabPaneStyle = {
    border: "1px solid",
    borderRadius: "10px",
    borderColor: "#c9c9c9",
    padding: "30px",
    boxShadow: "2px 2px 2px lightgrey",
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = ref(storage, file.name);

      try {
        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);
        setProfilePic(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  //For displaying new profile pic after upload
  const handleFileChange = (event) => {
    handleFileUpload(event);
    setPicSelected(true);
    //for displaying selected image
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //When save button is clicked after uploading pic
  const handlePicSubmit = async (event) => {
    event.preventDefault();
    const userDoc = doc(db, "users", userID);
    await updateDoc(userDoc, { profilePic: fileUrl });
    setUploadedPhoto(true);
  };

  //For displaying save button when a new username is typed
  const handleNameChange = (event) => {
    if (
      nameSubmitted.current.value == userName ||
      nameSubmitted.current.value == ""
    ) {
      setNameChanged(false);
    } else {
      setNameChanged(true);
    }
  };

  //For submitting username after save button is clicked
  const handleNameSubmit = async () => {
    const itemReturnedDoc = doc(db, "users", userID);
    await updateDoc(itemReturnedDoc, { name: nameSubmitted.current.value });
    setUsernameChanged(true);
    console.log(nameSubmitted.current.value);

    //backend here
  };

  //For submitted password after save button is clicked
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (!newPassword.current.value || !oldPassword.current.value) {
      setError("Please fill in your password");
      return;
    }

    reauthenticateWithCredential(currentUser, credential)
      .then(() => updatePassword(currentUser, newPassword.current.value))
      .then(() => {
        setPasswordChanged(true);
        newPassword.current.value = "";
        setError("");
        oldPassword.current.value = "";
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/missing-password":
            setError("Please fill in your password");
            break;
          case "auth/weak-password":
            setError("Password must be at least 6 characters long");
            break;
          case "auth/wrong-password":
            setError("Wrong password");
            break;
          default:
            setError("Failed to change password");
            console.log(error.code);
        }
      });
  };

  const handleOldPasswordChange = (e) => {
    setCredential(EmailAuthProvider.credential(userEmail, e.target.value));
  };

  return (
    <>
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey="#editProfile"
      >
        <Row>
          <Col sm={3} style={{ height: `calc(100vh - 400px)` }}>
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
                      {isLoading && (
                        <div
                          style={{
                            border: "3px solid white",
                            height: "150px",
                            width: "150px",
                            borderRadius: "50%",
                            background: "lightgrey",
                          }}
                        ></div>
                      )}
                      <Image
                        src={picSelected ? selectedImage : profilePic}
                        alt=""
                        roundedCircle
                        style={{
                          border: "3px solid white",
                          height: "150px",
                          width: "150px",
                          objectFit: "cover",
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
                        defaultValue={userEmail}
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
                        defaultValue={userName}
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
                      controlId="profileOldLabel"
                      label="Old Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Old Password"
                        onChange={handleOldPasswordChange}
                        ref={oldPassword}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="profileConfirmPassword"
                  >
                    <FloatingLabel
                      controlId="profileConfirmPasswordLabel"
                      label="New Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        ref={newPassword}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  {!passwordChanged && (
                    <Button type="submit" onClick={handleSubmitPassword}>
                      Save
                    </Button>
                  )}
                  {passwordChanged && (
                    <Button variant="outline-success" disabled>
                      Saved
                    </Button>
                  )}
                  {error && (
                    <Alert variant="danger" className="alert">
                      {error}
                    </Alert>
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
