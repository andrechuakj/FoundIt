import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import FoundData from "../MockFoundData";
import LostData from "../MockLostData";

const FilterBar = ({ searchKey }) => {
  return (
    <Tabs
      defaultActiveKey="lost"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      <Tab eventKey="lost" title="I lost something">
        <ItemView data={FoundData} searchKey={searchKey} />
      </Tab>
      <Tab eventKey="found" title="I found something">
        <ItemView data={LostData} searchKey={searchKey} />
      </Tab>
    </Tabs>
  );
};

export default FilterBar;