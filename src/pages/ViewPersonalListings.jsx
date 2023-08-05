import React from "react";
import PersonalItemTabs from "../components/PersonalItemTabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../components/NavigationBar";
import ProfileBar from "../components/ProfileBar";
import CategoryDropdown from "../components/CategoryDropdown";

const ViewPersonalListings = () => {
  const [searchPersonalKey, setSearchPersonalKey] = React.useState("");
  const [category, setCategory] = React.useState(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  return (
    <>
      <Row
        className="justify-content-md-center"
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
          <div>
            <NavigationBar
              searchKey={searchPersonalKey}
              setSearchKey={setSearchPersonalKey}
              setRefreshKey={setRefreshKey}
            />
          </div>
          <hr />
          <ProfileBar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              border: "1px solid grey",
              padding: "2px",
              borderRadius: "15px",
              display: "inline-block",
              marginBottom: "5px",
            }}
          >
            <CategoryDropdown category={category} setCategory={setCategory} />
          </div>
          <PersonalItemTabs
            searchPersonalKey={searchPersonalKey}
            categoryFilter={category}
            key={refreshKey}
            setRefreshKey={setRefreshKey}
          />
          <br />
        </Col>
      </Row>
    </>
  );
};

export default ViewPersonalListings;
