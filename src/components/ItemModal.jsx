import React from "react";
import { Modal, Button, Image, Container } from "react-bootstrap";
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const ItemModal = ({ show, onHide, data, lostOrFound, isPersonalView }) => {
  const foundItemsRef = collection(db, "foundItems");
  const lostItemsRef = collection(db, "lostItems");

  const handleClaim = () => {
    console.log(data.founder);
    alert("An email has been sent to the finder to return it to you.");
    onHide();
  };

  const handleReturn = () => {
    console.log(data.owner);
    alert("An email has been sent to the owner to retrieve it from you.");
    onHide();
  };

  const handleReturned = async () => {
    const itemReturnedDoc = doc(db, "foundItems", data.id);
    await updateDoc(itemReturnedDoc, { returned: true });
    console.log("item updated");
    onHide();
  };

  const handleClaimed = async () => {
    const itemLostDoc = doc(db, "lostItems", data.id);
    await updateDoc(itemLostDoc, { returned: true });
    console.log("item updated");
    onHide();
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
          <Button onClick={handleReturned}>Returned</Button>
        )}
        {lostOrFound == "lost" && isPersonalView && !data.returned && (
          <Button onClick={handleClaimed}>Claimed</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
