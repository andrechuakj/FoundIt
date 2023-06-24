import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Container, FormLabel, Alert } from "react-bootstrap";
import noImage from '../assets/noImage.jpg'

import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../contexts/UserContext";
import emailjs from 'emailjs-com';

const ReportItemModal = ({ openReportModal, setOpenReportModal }) => {
  const [lostOrFound, setLostOrFound] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [validated, setValidated] = useState(false);
  const { user } = useContext(UserContext);
  const generateUUID = () => crypto.randomUUID();
  const [successMessage, setSuccessMessage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [lostItems, setLostItems] = useState([]);

  const itemNameRef = React.useRef(null);
  const categoryRef = React.useRef(null);
  const colourRef = React.useRef(null);
  const othersRef = React.useRef(null);
  const locationRef = React.useRef(null);
  const dateRef = React.useRef(null);
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
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lostItems'), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setLostItems(items);
      console.log(items)
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
      setValidated(true)
      return event.stopPropagation();
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
          ownerEmail: `${user.email}`,
          ownerContact: `${user.contact}`,
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
          founderEmail: `${user.email}`,
          founderContact: `${user.contact}`,
          owner: null,
          returned: false,
        }
        createFoundItem(foundItem)

        /*
          When a user finds an item, check if this item matches any of the items
          in the lostItems collection(check by itemName). If there is/are matches
          get the email of the owner(s) and email them that their item may have
          been found
        */

        const matchedLostItems = lostItems.filter((lostItem) => {
          const similarityThreshold = 3
          /*
            This threshold determines how similar the items have to be to evaluate to true.
            eg. hydroflask and hyd1ro2fla3sk(3 changes) is true, but hydroflask and
            h1yd2ro3fl4ask(4 changes) is false. 

            This matching ignores capital letters and any spacing between letters or words.
          */
          const distance = calculateLevenshteinDistance(
            lostItem.itemName.toLowerCase().replace(/\s/g, ''),
            foundItem.itemName.toLowerCase().replace(/\s/g, '')
          );

          return distance <= similarityThreshold
        })

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
              from_name: 'admin',
              subject: 'Found matching item!',
              message: `Someone has found an item that may match your ${lostItem.itemName}.
              Please contact ${foundItem.founderEmail} for more information.`,
            };
            emailjs.send('service_g7kp72x', 'template_gf9torq', messageParams, 'yEkBjWfqBtL7tM8E3')
              .then((response) => {
                console.log('Email sent successfully!', response);
              })
              .catch((error) => {
                console.error('Error sending email:', error);
              });
          });
        } else {
          // Found item does not match any lost item
          console.log('Found item does not match any lost item.');
        }
        
      } else {
        console.log("User document does not exist")
      }
    } catch (error) {
      console.log(error)
    }
    setSuccessMessage('Form Submitted!')
    setFileUrl(null)
    resetInputFields()
  };

  const resetInputFields = () => {
    if (formRef.current) {
      formRef.current.reset();
      setValidated(false)
    }
    /*
      got some error, this resets the 'lose your item' or 'found an item' 
      to nothing
    */

  }

  const handleLostOrFound = (value) => {
    setLostOrFound(value);
  };

  const handleModalClose = () => {
    setLostOrFound('')
    setOpenReportModal(false);
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
      <Form noValidate validated={validated} onSubmit={handleSubmit} ref={formRef}>
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
                <Form.Control type="text" required ref={itemNameRef} autoFocus />
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
