import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import FoundData from "../MockFoundData";
import LostData from "../MockLostData";

const ItemTabs = ({ searchKey }) => {
  return (
    <Tabs
      defaultActiveKey="lost"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      <Tab eventKey="lost" title="Found Items">
        <ItemView data={FoundData} searchKey={searchKey} />
      </Tab>
      <Tab eventKey="found" title="Lost Items">
        <ItemView data={LostData} searchKey={searchKey} />
      </Tab>
    </Tabs>
  );
};

export default ItemTabs;
