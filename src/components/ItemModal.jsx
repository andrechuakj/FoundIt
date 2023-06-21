import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

const ItemModal = ({ show, onHide, data }) => {
  const handleClaim = () => {
    console.log(data.founder == "" ? data.loster : data.owner);
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
        <p>{"Location found/lost: " + data.location}</p>
        <p>{"Colour: " + data.colour}</p>
        <p>{"Date Reported: " + new Date(data.dateReported).toDateString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClaim}>Claim</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
