import React, { useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemTabs from "../components/ItemTabs";
import CategoryDropdown from "../components/CategoryDropdown";

const HomePage = () => {
  const [searchKey, setSearchKey] = React.useState("");
  const [category, setCategory] = React.useState(null);

  return (
    <>
      <Row
        className="justify-content-md-center"
        xxl
        style={{ height: "100vh", width: "100vw" }}
      >
        <Col
          lg="8"
          style={{
            border: "1px solid lightgrey",
            boxShadow: "0 0 10px black",
            backgroundColor: "white",
          }}
        >
          <NavigationBar searchKey={searchKey} setSearchKey={setSearchKey} />
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
          <ItemTabs searchKey={searchKey} categoryFilter={category} />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
