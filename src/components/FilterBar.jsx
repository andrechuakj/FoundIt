import React from "react";
import Nav from "react-bootstrap/Nav";

const FilterBar = () => {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">I lost my item</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">I found an item</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default FilterBar;
