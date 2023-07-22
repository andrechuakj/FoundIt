import React from "react";
import profilePic from "../../assets/profile pic.jpeg";

const Message = ({ ownMessage }) => {
  const ownMessageContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "row-reverse",
  };

  const ownMessageContentStyle = {
    background: "lightblue",
    borderRadius: "10px",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
  };

  const otherMessageContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
  };

  const otherMessageContentStyle = {
    background: "lightgrey",
    borderRadius: "10px",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
  };

  return (
    <div
      style={ownMessage ? ownMessageContainerStyle : otherMessageContainerStyle}
    >
      <img
        src={profilePic}
        alt="Profile Pic"
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          margin: "0px 10px",
          flexDirection: "column",
        }}
      />
      <div
        style={ownMessage ? ownMessageContentStyle : otherMessageContentStyle}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          dolores, odio autem officia inventore, laborum illum dolore ut in
          quisquam reprehenderit eum sit cumque? Minus atque ipsam dolorum
          dolores aperiam, odio libero sequi error nesciunt sed earum natus
          voluptas ad.
        </p>
        <span
          style={{ color: "grey", alignSelf: ownMessage ? "end" : "start" }}
        >
          Just now
        </span>
      </div>
    </div>
  );
};

export default Message;
