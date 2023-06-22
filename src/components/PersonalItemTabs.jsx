import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import FoundData from "../MockFoundData";
import LostData from "../MockLostData";

const PersonalItemTabs = ({ searchPersonalKey }) => {
  return (
    <Tabs
      defaultActiveKey="lost"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      <Tab eventKey="lost" title="Things I lost">
        <ItemView data={FoundData} searchKey={searchPersonalKey} />
      </Tab>
      <Tab eventKey="found" title="Things I found">
        <ItemView data={LostData} searchKey={searchPersonalKey} />
      </Tab>
    </Tabs>
  );
};

export default PersonalItemTabs;
