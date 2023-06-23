import React from "react";
import { FloatingLabel, Button, Form } from "react-bootstrap";

const EditProfileForm = () => {
  return (
    <>
      <h2>Edit Details</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control plaintext readOnly defaultValue="email@example.com" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              defaultValue={"$username"}
            />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default EditProfileForm;
