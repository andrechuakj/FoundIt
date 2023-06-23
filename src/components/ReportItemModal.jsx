import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Container, FormLabel } from "react-bootstrap";

const ReportItemModal = ({ openReportModal, setOpenReportModal }) => {
  const [lostOrFound, setLostOrFound] = React.useState(null);
  const [date, setDate] = React.useState(
    new Date().toISOString().substr(0, 10)
  );
  const [validated, setValidated] = React.useState(false);

  const itemNameRef = React.useRef(null);
  const categoryRef = React.useRef(null);
  const colourRef = React.useRef(null);
  const othersRef = React.useRef(null);
  const locationRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const pictureRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log("Lost or Found value:", lostOrFound);
    console.log("ItemName Value:", itemNameRef.current.value);
    console.log("Category Value:", categoryRef.current.value);
    console.log("Colour Value:", colourRef.current.value);
    console.log("Other descriptions Value:", othersRef.current.value);
    console.log("Location Value:", locationRef.current.value);
    console.log("Date Value:", dateRef.current.value);
    console.log("Picture Value:", pictureRef.current.value);
  };

  const handleLostOrFound = (value) => {
    setLostOrFound(value);
  };

  const handleModalClose = () => {
    setOpenReportModal(false);
    setLostOrFound(null);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Modal show={openReportModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report Item</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Control type="text" required ref={itemNameRef} autoFocus/>
                <Form.Control.Feedback type="invalid">
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
                <Form.Control type="file" accept="image/*" ref={pictureRef} />
              </Form.Group>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
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
