import React, { useState } from "react";
import profilePic from "../../assets/profile pic.jpeg";

const SidebarProfile = () => {
  const [hover, setHover] = useState(false);
  const divStyle = {
    borderBottom: "1px solid lightgrey",
    height: "70px",
    margin: "10px",
    cursor: "pointer",
    backgroundColor: hover ? "lightgrey" : "white",
    transition: "background-color 0.3s ease",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
  };

  return (
    <div
      style={divStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={profilePic}
        alt="Profile picture"
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          marginTop: "5px",
          flex: "1",
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
        <p style={{ fontSize: "16px", margin: "5px" }}>Name</p>
        <p
          style={{ marginBottom: "5px", marginLeft: "5px", overflow: "hidden" }}
        >
          Last message
        </p>
      </div>
    </div>
  );
};

export default SidebarProfile;
