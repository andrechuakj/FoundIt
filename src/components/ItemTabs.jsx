import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const FilterBar = ({ searchKey }) => {
  const [lostItems, setLostItems] = useState([])
  const [foundItems, setFoundItems] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lostItems'), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setLostItems(items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'foundItems'), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setFoundItems(items);
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
      <Tab eventKey="lost" title="Found items">
        <ItemView data={foundItems} searchKey={searchKey} />
      </Tab>
      <Tab eventKey="found" title="Lost items">
        <ItemView data={lostItems} searchKey={searchKey} />
      </Tab>
    </Tabs>
  );
};

export default FilterBar;
