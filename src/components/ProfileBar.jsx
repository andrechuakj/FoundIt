import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import profilePic from "../assets/profile pic.jpeg";
import { UserContext } from "../contexts/UserContext";

const ProfileBar = () => {
  const { user } = useContext(UserContext);
  const userName = `${user.name}`;

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
          <Image
            src={profilePic}
            alt="profile pic"
            roundedCircle
            style={{
              border: "3px solid white",
              height: "120px",
              width: "120px",
              display: "block",
              margin: "0 auto",
            }}
          />
          <h4>{userName}</h4>
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
