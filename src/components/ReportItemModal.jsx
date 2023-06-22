import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Container, FormLabel, Alert } from "react-bootstrap";
import noImage from '../assets/noImage.jpg'

import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../contexts/UserContext";

const ReportItemModal = ({ openReportModal, setOpenReportModal }) => {
  const [lostOrFound, setLostOrFound] = useState('lost');
  const [date, setDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [validated, setValidated] = useState(false);
  const { user } = useContext(UserContext);
  const generateUUID = () => crypto.randomUUID();
  const [successMessage, setSuccessMessage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

  const itemNameRef = React.useRef(null);
  const categoryRef = React.useRef(null);
  const colourRef = React.useRef(null);
  const othersRef = React.useRef(null);
  const locationRef = React.useRef(null);
  const dateRef = React.useRef(null);
  // const formRef = React.useRef(null);
  // const defaultImageURL = `https://storage.googleapis.com/orbital-milestone-2-cfb15.appspot.com/noImage.jpg`;

  // Handle file upload event
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = ref(storage, file.name);

      try {
        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL)

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } 
  };

  const createLostItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, 'lostItems'), item);
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const createFoundItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, 'foundItems'), item);
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      if (lostOrFound === 'lost') {
        const lostItem = {
          itemName: itemNameRef.current.value,
          category: categoryRef.current.value,
          colour: colourRef.current.value,
          others: othersRef.current.value,
          location: locationRef.current.value,
          dateReported: dateRef.current.value,
          itemPicture: fileUrl ? fileUrl : noImage,

          id: generateUUID(),
          founder: null,
          owner: `${user.name}`,
          returned: false,
        }
        createLostItem(lostItem)
      } else if (lostOrFound === 'found') {
        const foundItem = {
          itemName: itemNameRef.current.value,
          category: categoryRef.current.value,
          colour: colourRef.current.value,
          others: othersRef.current.value,
          location: locationRef.current.value,
          dateReported: dateRef.current.value,
          itemPicture: fileUrl ? fileUrl : noImage,

          id: generateUUID(),
          founder: `${user.name}`,
          owner: null,
          returned: false,
        }
        createFoundItem(foundItem)
      } else {
        console.log("User document does not exist")
      }
    } catch (error) {
      console.log(error)
    }
    setValidated(true);
    setSuccessMessage('Form Submitted!')
    setFileUrl(null)
    console.log("Lost or Found value:", lostOrFound);
    console.log("ItemName Value:", itemNameRef.current.value);
    console.log("Category Value:", categoryRef.current.value);
    console.log("Colour Value:", colourRef.current.value);
    console.log("Other descriptions Value:", othersRef.current.value);
    console.log("Location Value:", locationRef.current.value);
    console.log("Date Value:", dateRef.current.value);
    console.log("Picture Value:", fileUrl);
    //resetInputFields()
  };

  const resetInputFields = () => {
    console.log(lostOrFound)
    const lostOrFoundValue = lostOrFound
    // so that 'lost' or 'found' is saved

    if (formRef.current) {
      formRef.current.reset();
      setValidated(false)
    }
    console.log(lostOrFoundValue)
    handleLostOrFound(lostOrFoundValue)
    /*
      yo I try to make this such that default is on 'lose your item'. but issue
      now is whenever I am on 'found an item' and I press reset, the blue state
      goes to 'lose your item' when it should remain at 'found an item' ???
      idk why, cant seem to fix it
    */
  }

  const handleLostOrFound = (value) => {
    setLostOrFound(value);
  };

  const handleModalClose = () => {
    setOpenReportModal(false);
    setLostOrFound('lost');
    setValidated(false)
    setSuccessMessage('')
    setFileUrl(null)
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  //help idk how center the successMessage without using rem :/

  return (
    <Modal show={openReportModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report Item</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {successMessage && <Alert variant="success" className="mb-0 mt-4 d-flex justify-content-center"
          style={{ width: "50%", marginLeft: "7.5rem" }}>
          {successMessage}
        </Alert>}
        <Modal.Body>
          <Form.Group className="mb-3">
            <FormLabel>Did you: </FormLabel>
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
            <Container>
              <Form.Group className="mb-3" controlId="reportForm.itemName">
                <Form.Label>Item name</Form.Label>
                <Form.Control type="text" required ref={itemNameRef} />
                <Form.Control.Feedback type="invalid" htmlFor="reportForm.itemName">
                  Please provide an item name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="reportForm.category">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" required ref={categoryRef} />
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
                <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
              </Form.Group>
            </Container>
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
