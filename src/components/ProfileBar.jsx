import React from "react";
import Image from "react-bootstrap/Image";
import profilePic from "../assets/profile pic.jpeg";

const ProfileBar = () => {
  return (
    <>
      <div
        style={{
          height: "150px",
          position: "relative",
          background: "linear-gradient(to bottom, #a1e4ff, #ffffff)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: " translate(50%)",
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
              right: "50%",
              transform: "translate(50%)",
            }}
          />
          <h4>UserName's Listings</h4>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ProfileBar;
