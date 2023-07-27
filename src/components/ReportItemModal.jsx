import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Container, FormLabel, Alert } from "react-bootstrap";
import noImage from "../assets/noImage.jpg";
import CategoryDropdown from "./CategoryDropdown";
import MapPicker from "./Maps/MapPicker";

import { GeoPoint } from "firebase/firestore";
import { collection, addDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../contexts/UserContext";
import emailjs from "emailjs-com";

const ReportItemModal = ({ openReportModal, setOpenReportModal }) => {
  const [lostOrFound, setLostOrFound] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [validated, setValidated] = useState(false);
  const { user } = useContext(UserContext);
  const generateUUID = () => crypto.randomUUID();
  const [successMessage, setSuccessMessage] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const itemNameRef = React.useRef(null);
  const [categoryRef, setCategoryRef] = React.useState(null);
  const colourRef = React.useRef(null);
  const othersRef = React.useRef(null);
  const locationRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const fileInputRef = React.useRef();

  const successMessageRef = React.useRef()
  const formRef = React.useRef(null);

  /*
    This function compares strings to see if they are similar. It calculates
    the minimum number of edits (insertions, deletions, substitutions) 
    required to transform one string into another.
  */
  function calculateLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lostItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setLostItems(items);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Handle file upload event for pictures
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
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const createLostItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, "lostItems"), item);
      updateDoc(docRef, { id: docRef.id });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const createFoundItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, "foundItems"), item);
      updateDoc(docRef, { id: docRef.id });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      setValidated(true);
      return event.stopPropagation();
    }
    try {
      if (lostOrFound === "lost") {
        const lostItem = {
          itemName: itemNameRef.current.value,
          category: categoryRef,
          colour: colourRef.current.value,
          others: othersRef.current.value,
          location: locationRef.current.value,
          dateReported: dateRef.current.value,
          itemPicture: fileUrl ? fileUrl : noImage,
          coordinates: selectedLocation
            ? new GeoPoint(
              selectedLocation.latitude,
              selectedLocation.longitude
            )
            : null,
          id: generateUUID(),
          founder: null,
          owner: `${user.name}`,
          ownerEmail: `${user.email}`,
          ownerContact: `${user.contact}`,
          returned: false,
          reporterId: `${user.id}`,
        };
        createLostItem(lostItem);
      } else if (lostOrFound === "found") {
        const foundItem = {
          itemName: itemNameRef.current.value,
          category: categoryRef,
          colour: colourRef.current.value,
          others: othersRef.current.value,
          location: locationRef.current.value,
          dateReported: dateRef.current.value,
          itemPicture: fileUrl ? fileUrl : noImage,
          coordinates: selectedLocation
            ? new GeoPoint(
              selectedLocation.latitude,
              selectedLocation.longitude
            )
            : null,
          id: generateUUID(),
          founder: `${user.name}`,
          founderEmail: `${user.email}`,
          founderContact: `${user.contact}`,
          owner: null,
          returned: false,
          reporterId: `${user.id}`,
        };
        createFoundItem(foundItem);

        /*
          When a user finds an item, check if this item matches any of the items
          in the lostItems collection(check by itemName). If there is/are matches
          get the email of the owner(s) and email them that their item may have
          been found
        */

        const matchedLostItems = lostItems.filter((lostItem) => {
          const similarityThreshold = 3;
          /*
            This threshold determines how similar the items have to be to evaluate to true.
            eg. hydroflask and hyd1ro2fla3sk(3 changes) is true, but hydroflask and
            h1yd2ro3fl4ask(4 changes) is false. 

            This matching ignores capital letters and any spacing between letters or words.
          */
          const distance = calculateLevenshteinDistance(
            lostItem.itemName.toLowerCase().replace(/\s/g, ""),
            foundItem.itemName.toLowerCase().replace(/\s/g, "")
          );

          return distance <= similarityThreshold;
        });

        /*
        if (matchedLostItems.length > 0) {
          matchedLostItems.forEach((lostItem) => {
            console.log(lostItem.ownerEmail)
          })
        }

        This is for testing of calculateLevenshteinDistance. If you want to test what strings are counted as similar,
        just comment out createFoundItem(foundItem), resetInputFields(), and the whole if else block directly below.
        And also ofc uncomment this. 
        */

        if (matchedLostItems.length > 0) {
          // Found item matches one or more lost items
          matchedLostItems.forEach((lostItem) => {
            console.log(lostItem.ownerEmail);
            const messageParams = {
              to_name: `${lostItem.owner}`,
              recipientEmail: `${lostItem.ownerEmail}`,
              from_name: "admin",
              subject: "Found matching item!",
              message: `Someone has found an item that may match your ${lostItem.itemName}.
              Please contact ${foundItem.founderEmail} for more information.`,
            };
            emailjs
              .send(
                "service_g7kp72x",
                "template_gf9torq",
                messageParams,
                "yEkBjWfqBtL7tM8E3"
              )
              .then((response) => {
                console.log("Email sent successfully!", response);
              })
              .catch((error) => {
                console.error("Error sending email:", error);
              });
          });
        } else {
          // Found item does not match any lost item
          console.log("Found item does not match any lost item.");
        }
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
    resetInputFields();
    setSuccessMessage("Form Submitted!");
    setScrollIntoView
  };

  const setScrollIntoView = () => {
    // scrolls the validation message into view, and the block: 'nearest' ensures it scrolls the modal and not the window
    successMessageRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  const resetInputFields = () => {
    if (formRef.current) {
      setCategoryRef(null)
      setValidated(false)
      setSelectedLocation(null)
      setFileUrl(null)
      setSuccessMessage("")
      setFileUrl(null)
      fileInputRef.current.value = ''

      const itemNameElement = itemNameRef.current
      itemNameElement.value = itemNameElement.defaultValue;

      const colourElement = colourRef.current
      colourElement.value = colourElement.defaultValue;

      const othersElement = othersRef.current
      othersElement.value = othersElement.defaultValue;

      const locationElement = locationRef.current
      locationElement.value = locationElement.defaultValue;

      const dateElement = dateRef.current
      dateElement.value = dateElement.defaultValue;
    }
  };

  const handleLostOrFound = (value) => {
    setLostOrFound(value);
  };

  const handleModalClose = () => {
    setLostOrFound("");
    setOpenReportModal(false);
    setValidated(false);
    setSuccessMessage("");
    setSelectedLocation(null);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Modal show={openReportModal} onHide={handleModalClose} size="lg">
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto">Report Item</Modal.Title>
      </Modal.Header>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Modal.Body className="mt-0">
          {successMessage && (
            <Alert
              variant="success"
              className="mb-0 mt-4 d-flex justify-content-center"
              style={{ width: "50%", margin: "auto" }}
            >
              {successMessage}
            </Alert>
          )}
          <Form.Group className="mb-3">
            <FormLabel ref={successMessageRef}>Did you: </FormLabel>
            <Container style={{ display: "flex", width: "100%" }}>
              <ToggleButtonGroup
                type="radio"
                name="options"
                onChange={handleLostOrFound}
                style={{ width: "100%" }}
                value={lostOrFound}
              >
                <ToggleButton
                  id="tbg-radio-1"
                  value="lost"
                  variant="outline-primary"
                  style={{ flex: "1" }}
                >
                  lose your item
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-2"
                  value="found"
                  variant="outline-primary"
                  style={{ flex: "1" }}
                >
                  found an item
                </ToggleButton>
              </ToggleButtonGroup>
            </Container>
          </Form.Group>
          {lostOrFound && (
            <div className="modal-body row">
              <div className="col-md-6 border-end pe-4 border-2">
                <Form.Group className="mb-3" controlId="reportForm.itemName">
                  <Form.Label>Item name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    ref={itemNameRef}
                    autoFocus
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    htmlFor="reportForm.itemName"
                  >
                    Please provide an item name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="reportForm.category">
                  <Form.Label>Category</Form.Label>
                  <CategoryDropdown
                    category={categoryRef}
                    setCategory={setCategoryRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a category.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="reportForm.colour">
                  <Form.Label>Item Colour</Form.Label>
                  <Form.Control type="text" required ref={colourRef} />
                  <Form.Control.Feedback type="invalid">
                    Please provide the item's colour.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="reportForm.location">
                  <Form.Label>
                    {lostOrFound == "lost" ? "Location lost" : "Location found"}
                  </Form.Label>
                  <Form.Control type="text" required ref={locationRef} />
                  <Form.Control.Feedback type="invalid">
                    Please provide item location.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="reportForm.others">
                  <Form.Label>Other description</Form.Label>
                  <Form.Control as="textarea" rows={3} ref={othersRef} />
                </Form.Group>
              </div>
              <div className="col-md-6 ps-4">
                <MapPicker
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
                <Form.Group className="mb-3" controlId="reportForm.date">
                  <Form.Label>
                    {lostOrFound == "lost" ? "Date lost" : "Date found"}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                    ref={dateRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {lostOrFound == "lost"
                      ? "Please provide the date that item was lost"
                      : "Please provide the date that item was found"}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Picture of item</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </Form.Group>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {lostOrFound && (
            <Button variant="secondary" onClick={resetInputFields}>
              Reset fields
            </Button>
          )}
          {lostOrFound && (
            <Button type="submit" variant="primary">
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReportItemModal;
