import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ItemTabs = ({ searchKey, categoryFilter }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lostItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setLostItems(items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foundItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setFoundItems(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Tabs
      defaultActiveKey="found"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{ fontSize: "20px", fontWeight: "bold" }}
    >
      <Tab eventKey="found" title="Found items">
        <ItemView
          data={foundItems}
          lostOrFound="found"
          searchKey={searchKey}
          isPersonalView={false}
          categoryFilter={categoryFilter}
        />
      </Tab>
      <Tab eventKey="lost" title="Lost items">
        <ItemView
          data={lostItems}
          lostOrFound="lost"
          searchKey={searchKey}
          isPersonalView={false}
          categoryFilter={categoryFilter}
        />
      </Tab>
    </Tabs>
  );
};

export default ItemTabs;
