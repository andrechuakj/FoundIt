import React from "react";
import FoundData from "../MockFoundData";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ItemView = () => {
  const [idHovered, setIdHovered] = React.useState(null);

  const handleHover = (id) => {
    setIdHovered(id);
  };

  const handleMouseLeave = () => {
    setIdHovered(null);
  };

  const idMatch = (id) => {
    return id == idHovered;
  };

  return (
    <>
      <Row className="g-4">
        {FoundData.filter((item) => !item.returned).map((item) => (
          <Col key={item.id}>
            <Card
              id={item.id}
              style={{
                width: "280px",
                height: "400px",
                position: "relative",
                display: "flex",
                justify: "center",
                align: "center",
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
                    verticalAlign: "center",
                    padding: "20px",
                    height: "200px",
                  }}
                >
                  <Card.Text className="mx-auto">View details</Card.Text>
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
                  {item.dateReported.toDateString()}
                </Card.Text>
                <Button variant="primary">Claim</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ItemView;
