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
import { ChatContext } from "../../contexts/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [err, setErr] = useState(false);
  const [hover, setHover] = useState(false);
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);

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
    transform: "scaleY(1)",
    transformOrigin: "top",
    transition: "transform 1s ease",
  };

  const handleSearch = async (e) => {
    setUsername(e.target.value);
  };

  const handleSelectedUser = async () => {
    const combinedId =
      user.id > searchedUser.id
        ? user.id + searchedUser.id
        : searchedUser.id + user.id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", user.id), {
          [combinedId + ".userInfo"]: {
            id: searchedUser.id,
            name: searchedUser.name,
            profilePic: searchedUser.profilePic,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", searchedUser.id), {
          [combinedId + ".userInfo"]: {
            id: user.id,
            name: user.name,
            profilePic: user.profilePic,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    dispatch({ type: "CHANGE_USER", payload: searchedUser });
    setUsername("");
    setSearchedUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      if (username === "") {
        setSearchedUser(null);
        setErr(false);
      } else {
        const q = query(collection(db, "users"), where("name", "==", username));

        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            setErr(true);
            setSearchedUser(null);
          } else {
            setErr(false);
          }
          querySnapshot.forEach((doc) => {
            setSearchedUser(doc.data());
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
        style={{
          width: "100%",
          border: "none",
          borderRadius: "0px",
          borderBottom: "1px solid grey",
          padding: "5px",
          outline: "none",
        }}
      />
      {err && <span>User not found!</span>}
      {searchedUser && (
        <>
          <div
            style={divStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleSelectedUser}
            key={searchedUser.id}
          >
            <img
              src={searchedUser.profilePic}
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
              <p
                style={{ fontSize: "16px", margin: "5px", fontWeight: "bold" }}
              >
                {searchedUser.name}
              </p>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
