import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemView from "./ItemView";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const PersonalItemTabs = ({
  searchPersonalKey,
  categoryFilter,
  refreshKey,
  setRefreshKey,
}) => {
  const [personalLostItems, setPersonalLostItems] = useState([]);
  const [personalFoundItems, setPersonalFoundItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "lostItems"));
        const items = snapshot.docs.map((doc) => doc.data());
        setPersonalLostItems(items);
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
        setPersonalFoundItems(items);
        setIsLoading(false);
      } catch (error) {
        // Handle any potential errors
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Tabs
      defaultActiveKey="found"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      <Tab eventKey="found" title="Things I found">
        <ItemView
          data={personalFoundItems}
          lostOrFound={"found"}
          searchKey={searchPersonalKey}
          isPersonalView={true}
          categoryFilter={categoryFilter}
          isLoading={isLoading}
          setRefreshKey={setRefreshKey}
        />
      </Tab>
      <Tab eventKey="lost" title="Things I lost">
        <ItemView
          data={personalLostItems}
          lostOrFound={"lost"}
          searchKey={searchPersonalKey}
          isPersonalView={true}
          categoryFilter={categoryFilter}
          isLoading={isLoading}
          setRefreshKey={setRefreshKey}
        />
      </Tab>
    </Tabs>
  );
};

export default PersonalItemTabs;
