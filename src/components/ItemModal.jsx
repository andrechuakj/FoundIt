import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Image, Container } from "react-bootstrap";
import {
  updateDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import MapDisplayOne from "./Maps/MapDisplayOne";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../contexts/ChatContext";
import UserContext from "../contexts/UserContext";

const ItemModal = ({
  show,
  onHide,
  data,
  lostOrFound,
  isPersonalView,
  setRefreshKey,
}) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ChatContext);
  const [otherUser, setOtherUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useContext(UserContext);

  const handleContact = () => {
    // Load other user, then useEffect hooks will
    // load current user, then chat
    const fetchData = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", data.reporterId));
        if (snapshot.exists()) {
          setOtherUser(snapshot.data());
          dispatch({
            type: "CHANGE_USER",
            payload: snapshot.data(),
          });
        } else {
          alert("No user found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    onHide();
    fetchData();
  };

  useEffect(() => {
    // After loading other user, load current user
    if (otherUser) {
      const fetchData = async () => {
        try {
          const snapshot = await getDoc(doc(db, "users", user.id));
          if (snapshot.exists()) {
            setCurrentUser(snapshot.data());
          } else {
            alert("No user found");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [otherUser]);

  useEffect(() => {
    // After loading current user, create and load chat
    if (currentUser) {
      const createChat = async () => {
        const combinedId =
          currentUser.id > otherUser.id
            ? currentUser.id + otherUser.id
            : otherUser.id + currentUser.id;
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
          if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            await updateDoc(doc(db, "userChats", currentUser.id), {
              [combinedId + ".userInfo"]: {
                id: otherUser.id,
                name: otherUser.name,
                profilePic: otherUser.profilePic,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", otherUser.id), {
              [combinedId + ".userInfo"]: {
                id: currentUser.id,
                name: currentUser.name,
                profilePic: currentUser.profilePic,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {
          console.log(err);
        }
        navigate("/messages");
      };
      createChat();
    }
  }, [currentUser]);

  const handleReturned = async () => {
    const itemReturnedDoc = doc(db, "foundItems", data.id);
    await updateDoc(itemReturnedDoc, { returned: true });
    console.log("item updated");
    onHide();

    // change data.returned to true here
    const documentId = data.id;

    // Get a reference to the document
    const itemRef = doc(db, "foundItems", documentId);
    updateDoc(itemRef, { returned: true })
      .then(() => {
        console.log("data.returned successfully changed to true");
      })
      .then(() => {
        setRefreshKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        console.log("data.returned cannot be changed", error);
      });
  };

  const handleClaimed = async () => {
    const itemLostDoc = doc(db, "lostItems", data.id);
    await updateDoc(itemLostDoc, { returned: true });
    console.log("item updated");
    onHide();

    //change data.returned to true here
    const documentId = data.id;

    // Get a reference to the document
    const itemRef = doc(db, "lostItems", documentId);
    updateDoc(itemRef, { returned: true })
      .then(() => {
        console.log("data.returned successfully changed to true");
      })
      .then(() => {
        setRefreshKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        console.log("data.returned cannot be changed", error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container
          style={{
            maxHeight: "400px",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={data.itemPicture}
            alt="..."
            fluid
            thumbnail
            className="mx-auto"
            style={{
              maxHeight: "400px",
              maxWidth: "400px",
            }}
          />
        </Container>
        <hr />
        <h4>{data.itemName}</h4>
        <p>
          {lostOrFound === "found"
            ? "Location found: " + data.location
            : "Location lost: " + data.location}
        </p>
        <p>{"Colour: " + data.colour}</p>
        <p>
          {lostOrFound === "found"
            ? "Finder name: " + data.founder
            : "Owner name: " + data.owner}
        </p>
        <p>
          {lostOrFound === "found"
            ? "Finder email: " + data.founderEmail
            : "Owner email: " + data.ownerEmail}
        </p>
        <p>{"Date Reported: " + new Date(data.dateReported).toDateString()}</p>

        {data.coordinates?.latitude && data.coordinates?.longitude && (
          <MapDisplayOne coords={data.coordinates} />
        )}
      </Modal.Body>
      <Modal.Footer>
        {lostOrFound == "found" && data.reporterId != user.id && (
          <Button onClick={handleContact}>Contact</Button>
        )}
        {lostOrFound == "lost" && data.reporterId != user.id && (
          <Button onClick={handleContact}>Contact</Button>
        )}
        {lostOrFound == "found" &&
          data.reporterId === user.id &&
          !data.returned && <Button onClick={handleReturned}>Returned</Button>}
        {lostOrFound == "lost" &&
          data.reporterId === user.id &&
          !data.returned && <Button onClick={handleClaimed}>Claimed</Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
