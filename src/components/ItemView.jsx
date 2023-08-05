import React, { useState, useEffect, useContext, useRef } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import ItemModal from "./ItemModal";
import { UserContext } from "../contexts/UserContext";
import CardSkeleton from "./CardSkeleton";

const ItemView = ({
  data,
  lostOrFound,
  searchKey,
  isPersonalView,
  categoryFilter,
  isLoading,
  setRefreshKey,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const { user } = useContext(UserContext);
  const userEmail = `${user.email}`;
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

  const handleHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
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

  const filterByUser = (item) => {
    if (isPersonalView) {
      return item.ownerEmail == userEmail || item.founderEmail == userEmail;
    } else {
      return true;
    }
  };

  const filterByReturn = (item) => {
    if (isPersonalView) {
      return true;
    } else {
      return !item.returned;
    }
  };

  const filterByCategory = (item) => {
    if (categoryFilter == null) {
      return true;
    } else {
      return item.category == categoryFilter;
    }
  };

  const sortByReturned = (x, y) => {
    if (!isPersonalView) {
      return 0;
    } else {
      if (x.returned && !y.returned) {
        return 1;
      } else if (!x.returned && y.returned) {
        return -1;
      } else {
        return 0;
      }
    }
  };

  return (
    <>
      <ItemModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={itemToShow}
        lostOrFound={lostOrFound}
        isPersonalView={isPersonalView}
        setRefreshKey={setRefreshKey}
      />
      <Container fluid>
        <Row className="g-4 d-flex flex-wrap">
          {isLoading &&
            new Array(8)
              .fill(0)
              .map((item, index) => <CardSkeleton key={index} />)}
          {data
            .filter(filterByReturn)
            .filter(filterByUser)
            .filter(filterByCategory)
            .filter(filterBySearch)
            .sort(
              (x, y) => Date.parse(y.dateReported) - Date.parse(x.dateReported)
            )
            .sort(sortByReturned)
            .map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <Card
                    id={item.id}
                    onClick={() => handleClick(item)}
                    style={{
                      width: "280px",
                      height: "400px",
                      cursor: "pointer",
                      boxShadow: "2px 2px 2px lightgrey",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => handleHover(e)}
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
                    {item.returned && (
                      <Card.ImgOverlay
                        style={{
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          height: "200px",
                        }}
                      >
                        <Card.Text style={{ fontSize: "20px", width: "100%" }}>
                          {lostOrFound == "lost" ? "Claimed" : "Returned"}
                        </Card.Text>
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
                </div>
              </div>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default ItemView;
