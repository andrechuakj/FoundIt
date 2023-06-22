import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ItemModal from "./ItemModal";


const ItemView = ({ data, searchKey }) => {
  const [idHovered, setIdHovered] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [itemToShow, setItemToShow] = React.useState({
    id: null,
    founder: null,
    owner: null,
    returned: null,
    dateReported: null,
    itemName: null,
    itemPicture: null,
    colour: null,
    location: null,
  });

  const handleHover = (id) => {
    setIdHovered(id);
  };

  const handleMouseLeave = () => {
    setIdHovered(null);
  };

  const idMatch = (id) => {
    return id == idHovered;
  };

  const handleClick = (item) => {
    setItemToShow(item);
    setModalShow(true);
  };

  const filterBySearch = (item) => {
    if (!searchKey) {
      return true;
    } else {
      return (
        item.itemName.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.location.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
  };

  return (
    <>
      <ItemModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={itemToShow}
      />
      <Row className="g-4">
        {data
          .filter((item) => !item.returned)
          .filter(filterBySearch)
          .sort((x, y) => y.dateReported - x.dateReported)
          .map((item) => (
            <Col key={item.id}>
              <Card
                id={item.id}
                onClick={() => handleClick(item)}
                style={{
                  width: "280px",
                  height: "400px",
                  position: "relative",
                  display: "flex",
                  justify: "center",
                  align: "center",
                  cursor: "pointer",
                }}
                onMouseEnter={() => handleHover(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Card.Img
                  variant="top"
                  src={item.itemPicture}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                {idMatch(item.id) && (
                  <Card.ImgOverlay
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "#ffffff",
                      textAlign: "center",
                      padding: "75px",
                      height: "200px",
                      opacity: "0.9",
                    }}
                  >
                    <Card.Text>Click to view details</Card.Text>
                  </Card.ImgOverlay>
                )}
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {item.itemName}
                  </Card.Title>
                  <Card.Text style={{ overflow: "hidden" }}>
                    {item.location}
                  </Card.Text>
                  <Card.Text style={{ overflow: "hidden" }}>
                    {item.dateReported}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ItemView;
