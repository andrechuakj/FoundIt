import React from "react";
import { Card, Placeholder } from "react-bootstrap";

const CardSkeleton = () => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="d-flex justify-content-center align-items-center h-100">
        <Card
          style={{
            width: "280px",
            height: "400px",
            boxShadow: "2px 2px 2px lightgrey",
            transition: "transform 0.3s ease",
          }}
        >
          <div
            style={{
              height: "200px",
              objectFit: "cover",
              background: "lightgrey",
            }}
          >
            {" "}
          </div>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder animation="glow">
              <div>
                <Placeholder xs={6} />
              </div>{" "}
              <Placeholder xs={5} />
            </Placeholder>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CardSkeleton;
