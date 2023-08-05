import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ItemTabs = ({ searchKey, categoryFilter, setRefreshKey }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "lostItems"));
        const items = snapshot.docs.map((doc) => doc.data());
        setLostItems(items);
        setIsLoading(false);
      } catch (error) {
        // Handle any potential errors
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "foundItems"));
        const items = snapshot.docs.map((doc) => doc.data());
        setFoundItems(items);
        setIsLoading(false);
      } catch (error) {
        // Handle any potential errors
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Tabs
        defaultActiveKey="found"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        <Tab eventKey="found" title="Found Items">
          <ItemView
            data={foundItems}
            lostOrFound="found"
            searchKey={searchKey}
            isPersonalView={false}
            categoryFilter={categoryFilter}
            isLoading={isLoading}
            setRefreshKey={setRefreshKey}
          />
        </Tab>
        <Tab eventKey="lost" title="Lost Items">
          <ItemView
            data={lostItems}
            lostOrFound="lost"
            searchKey={searchKey}
            isPersonalView={false}
            categoryFilter={categoryFilter}
            isLoading={isLoading}
            setRefreshKey={setRefreshKey}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ItemTabs;
