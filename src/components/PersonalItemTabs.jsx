import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const PersonalItemTabs = ({ searchPersonalKey }) => {
  const [personalLostItems, setPersonalLostItems] = useState([]);
  const [personalFoundItems, setPersonalFoundItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lostItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setPersonalLostItems(items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foundItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setPersonalFoundItems(items);
    });

    return () => unsubscribe();
  }, []);
  return (
    <Tabs
      defaultActiveKey="lost"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      <Tab eventKey="lost" title="Things I lost">
        <ItemView
          data={personalLostItems}
          searchKey={searchPersonalKey}
          isPersonalView={true}
        />
      </Tab>
      <Tab eventKey="found" title="Things I found">
        <ItemView
          data={personalFoundItems}
          searchKey={searchPersonalKey}
          isPersonalView={true}
        />
      </Tab>
    </Tabs>
  );
};

export default PersonalItemTabs;
