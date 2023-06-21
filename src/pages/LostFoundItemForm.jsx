import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ItemView from "../components/ItemView";
import NavigationBar from "../components/NavigationBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom"
import Nav from "react-bootstrap/Nav";
import { collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function LostFoundItemForm() {
  const { user } = useContext(UserContext);

  const [returned, setReturned] = useState(false)
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [colour, setColour] = useState("");
  const [location, setLocation] = useState("")
  const [picture, setPicture] = useState('')



  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false)

  /*
    separate the lost and found form
  */

  const handleForm = async (lostItemData) => {
    if (itemName === "") {
      return setError("Please fill in the item name");
    }
    if (date === "") {
      return setError("Please fill in the approximate date and time you lost your item");
    }
    if (colour === "") {
      return setError("Please fill in the colour of your lost item");
    }
    if (location === "") {
      return setError("Please fill in the locaion you lost your item");
    }
    console.log('0')
    try {
      setError("");
      setLoading(true);
      console.log('1')

      // Retrieve the user's document from Firestore
      const email = `${user.email}`
      const usersCollectionRef = collection(db, "users");
      const queryByEmail = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(queryByEmail);

      if (!querySnapshot.empty) {
        // Retrieve the current "lostItems" array from the user's document
        const currentLostItems = querySnapshot.docs[0].data().lostItems;
        console.log(currentLostItems)

        // Create a new object with the lost item data
        const newLostItem = {
          itemName,
          location,
          dateAndTime,
          itemDescription,
          picture,
        }

        // Update the "lostItems" array by pushing the new lost item
        const updatedLostItems = [...currentLostItems, newLostItem];
        console.log(updatedLostItems)

        // Update the user's document with the updated "lostItems" array
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, { lostItems: updatedLostItems });
        console.log('4')

        // resetInputFields();
        // setSuccessMessage("Sign up successful!");
        // console.log("User signed up successfully.");
      } else {
        console.log("User document does not exist")
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }




  function handleSubmit(e) {
    e.preventDefault()
    handleForm()
  }

  return (
    <>
      {user ? `${user.contact}, ${user.email}, ${user.password}` : 'no user'}
      <Row className="justify-content-md-center">
        <Col lg="8">
          <div>
            <NavigationBar />
          </div>
          <hr />
          <FilterBar />
          <br />
          <div>
            <form onSubmit={handleSubmit} className="form">
              <h1 className="">Sign Up</h1>
              {successMessage && (
                <Alert variant="success" className="alert">
                  {successMessage}
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="alert">
                  {error}
                </Alert>
              )}
              <label htmlFor="itemName">Item name</label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                type="name"
                id="itemName"
                name="itemName"
                placeholder="Item name"
              />

              <label htmlFor="date">Date lost</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="number"
                id="date"
                name="date"
                placeholder="Date lost"
              />

              <label htmlFor="location">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="name"
                id="location"
                name="location"
                placeholder="Location lost"
              />

              <label htmlFor="colour">Item colour</label>
              <input
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                type="name"
                id="colour"
                placeholder="Item colour"
              />

              <label htmlFor="picture">Picture of item</label>
              <input
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                type="name"
                id="picture"
                placeholder="insert picture here"
              />

              <button disabled={loading} className="log-in-sign-up-button">
                Submit form
              </button>

            </form>
          </div>
        </Col>
      </Row>
      <button>
        <Link to="/home-page">Back</Link>
      </button>
    </>

  )
}
