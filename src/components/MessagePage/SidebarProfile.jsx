import React, { useState, useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const SidebarProfile = ({ data }) => {
  const [hover, setHover] = useState(false);
  const { dispatch } = useContext(ChatContext);
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
    justifyContent: "space-between",
    overflow: "hidden",
  };

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div
      style={divStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleSelect(data[1].userInfo)}
    >
      <img
        src={data[1].userInfo?.profilePic}
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
        <p style={{ fontSize: "16px", margin: "5px", fontWeight: "bold" }}>
          {data[1].userInfo?.name}
        </p>
        <p
          style={{
            marginBottom: "5px",
            marginLeft: "5px",
          }}
        >
          {data[1].lastMessage?.text}
        </p>
      </div>
    </div>
  );
};

export default SidebarProfile;
