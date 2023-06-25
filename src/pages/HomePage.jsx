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
      <div>
        <Row className="justify-content-md-center" xxl>
          <Col lg="8">
            <div>
              <NavigationBar
                searchKey={searchKey}
                setSearchKey={setSearchKey}
              />
            </div>
            <hr />
            <div
              style={{
                border: "1px solid grey",
                padding: "2px",
                borderRadius: "15px",
                display:"inline-block",
                marginBottom:"5px"
              }}
            >
              <CategoryDropdown category={category} setCategory={setCategory} />
            </div>
            <ItemTabs searchKey={searchKey} categoryFilter={category}/>
            <br />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
