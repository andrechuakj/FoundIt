import React, { useState, useContext, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import UserContext from "../../contexts/UserContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [hover, setHover] = useState(false);
  const divStyle = {
    borderBottom: "1px solid grey",
    height: "70px",
    margin: "10px",
    cursor: "pointer",
    backgroundColor: hover ? "grey" : "lightgrey",
    transition: "background-color 0.3s ease",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
  };

  const handleSearch = async (e) => {
    setUsername(e.target.value);
  };

  const handleSelectedUser = async () => {
    
  }

  useEffect(() => {
    const getUser = async () => {
      if (username === "") {
        setUser(null);
        setErr(false);
      } else {
        const q = query(collection(db, "users"), where("name", "==", username));

        try {
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot);
          if (querySnapshot.empty) {
            setErr(true);
            setUser(null);
          } else {
            setErr(false);
          }
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (err) {
          setErr(true);
        }
      }
    };
    getUser();
  }, [username]);

  return (
    <div>
      <input
        type="text"
        placeholder="Find a user"
        onChange={(e) => handleSearch(e)}
        value={username}
        style={{ width: "100%", border: "none", borderRadius: "0px", borderBottom: "1px solid grey", padding: "5px", outline: "none" }}
      />
      {err && <span>User not found!</span>}
      {user && (
        <>
          <div
            style={divStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleSelectedUser}
          >
            <img
              src={user.profilePic}
              alt="Profile picture"
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "5px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "space-evenly",
                flex: "8",
              }}
            >
              <p style={{ fontSize: "16px", margin: "5px" }}>{user.name}</p>
              <p
                style={{
                  marginBottom: "5px",
                  marginLeft: "5px",
                  overflow: "hidden",
                }}
              >
                Last message
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
