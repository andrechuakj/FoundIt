import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemTabs from "../components/ItemTabs";

const HomePage = () => {
  const [searchKey, setSearchKey] = React.useState("");

  const { user } = useContext(UserContext);

  return (
    <>
      {user ? `${user.contact}, ${user.email}, ${user.password}` : "no user"}
      <Row className="justify-content-md-center" xxl>
        <Col lg="8">
          <div>
            <NavigationBar searchKey={searchKey} setSearchKey={setSearchKey} />
          </div>
          <hr />
          <ItemTabs searchKey={searchKey} />
          <br />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
