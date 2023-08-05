import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemTabs from "../components/ItemTabs";
import CategoryDropdown from "../components/CategoryDropdown";

const HomePage = () => {
  const [searchKey, setSearchKey] = React.useState("");
  const [category, setCategory] = React.useState(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  return (
    <>
      <Row
        className="justify-content-center"
        style={{ height: "100vh", width: "100%", margin: "0px" }}
      >
        <Col
          xxl="8"
          xl="9"
          lg="10.5"
          md="11"
          style={{
            border: "1px solid lightgrey",
            boxShadow: "0 0 10px black",
            backgroundColor: "white",
          }}
        >
          <NavigationBar
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            setRefreshKey={setRefreshKey}
          />
          <hr />
          <div
            style={{
              border: "1px solid grey",
              padding: "2px",
              borderRadius: "15px",
              display: "inline-block",
              marginBottom: "5px",
              background: "white",
            }}
          >
            <CategoryDropdown category={category} setCategory={setCategory} />
          </div>
          <ItemTabs
            searchKey={searchKey}
            categoryFilter={category}
            key={refreshKey}
            setRefreshKey={setRefreshKey}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
