import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";


const ItemModal = ({ show, onHide, data, lostOrFound, isPersonalView }) => {
  const handleClaim = () => {
    console.log(data.founder);
    alert("An email has been sent to the finder to return it to you.");
    // to do after milestone 2
    onHide();
  };

  const handleReturn = () => {
    console.log(data.owner);
    alert("An email has been sent to the owner to retrieve it from you.");
    // to do after milestone 2, actually is this button necessary?..
    onHide();
  };

  const handleClaimed = () => {
    console.log(data.founder);
    onHide();
    // change data.returned to true here
    const documentId = data.id;
    
    // Get a reference to the document
    const itemRef = doc(db, 'foundItems', documentId);
    updateDoc(itemRef, { returned: true })
      .then(() => {
        console.log('data.returned successfully changed to true')
      })
      .catch((error) => {
        console.log('data.returned cannot be changed', error)
      })

  };

  const handleReturned = () => {
    console.log(data.owner);
    onHide();
    //change data.returned to true here
    const documentId = data.id;
    
    // Get a reference to the document
    const itemRef = doc(db, 'lostItems', documentId);
    updateDoc(itemRef, { returned: true })
      .then(() => {
        console.log('data.returned successfully changed to true')
      })
      .catch((error) => {
        console.log('data.returned cannot be changed', error)
      })

  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container
          style={{
            maxHeight: "400px",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={data.itemPicture}
            alt="..."
            fluid
            thumbnail
            className="mx-auto"
            style={{
              maxHeight: "400px",
              maxWidth: "400px",
            }}
          />
        </Container>
        <hr />
        <h4>{data.itemName}</h4>
        <p>
          {lostOrFound === "found"
            ? "Location found: " + data.location
            : "Location lost: " + data.location}
        </p>
        <p>{"Colour: " + data.colour}</p>
        <p>{"Date Reported: " + new Date(data.dateReported).toDateString()}</p>
        <p>
          {lostOrFound === "found"
            ? "Finder email: " + data.founderEmail
            : "Owner email: " + data.ownerEmail}
        </p>
        <p>
          {lostOrFound === "found"
            ? "Finder contact: " + data.founderContact
            : "Owner contact: " + data.ownerContact}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {lostOrFound == "found" && !isPersonalView && (
          <Button onClick={handleClaim}>Claim</Button>
        )}
        {lostOrFound == "lost" && !isPersonalView && (
          <Button onClick={handleReturn}>Return</Button>
        )}
        {lostOrFound == "found" && isPersonalView && !data.returned && (
          <Button onClick={handleClaimed}>Claimed</Button>
        )}
        {lostOrFound == "lost" && isPersonalView && !data.returned && (
          <Button onClick={handleReturned}>Returned</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
