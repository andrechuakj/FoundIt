import React, { useContext, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { UserContext } from "../contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProfileBar = () => {
  const { user } = useContext(UserContext);
  const userId = `${user.id}`;
  const [profilePic, setProfilePic] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetchDocument(userId);
  }, []);

  const fetchDocument = async (docId) => {
    try {
      const docRef = doc(db, "users", docId);
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        setProfilePic(documentData.profilePic);
        setUserName(documentData.name);
        setIsLoading(false);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log("Error fetching document:", error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "150px",
          position: "relative",
          background: "linear-gradient(to bottom, #a1e4ff, #ffffff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translateX(50%)",
            textAlign: "center",
          }}
        >
          {isLoading && (
            <div
              style={{
                height: "120px",
                width: "120px",
                borderRadius: "50%",
                background: "lightgrey",
              }}
            ></div>
          )}
          {!isLoading && (
            <Image
              src={profilePic}
              alt=""
              roundedCircle
              style={{
                border: "3px solid white",
                height: "120px",
                width: "120px",
                display: "block",
                margin: "0 auto",
              }}
            />
          )}
          <h4>{userName}</h4>
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
