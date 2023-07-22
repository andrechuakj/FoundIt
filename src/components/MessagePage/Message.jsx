import React, { useContext, useRef, useEffect } from "react";
import profilePic from "../../assets/profile pic.jpeg";
import { UserContext } from "../../contexts/UserContext";
import { ChatContext } from "../../contexts/ChatContext";

const Message = ({ message }) => {
  const { user } = useContext(UserContext);
  const userPic = `${user.profilePic}`;
  const { data } = useContext(ChatContext);
  const ownMessage = message.senderId === user.id;
  const ref = useRef();

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
    overflowWrap: "break-word",
  };

  const otherMessageContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    overflowWrap: "break-word",
  };

  const otherMessageContentStyle = {
    background: "lightgrey",
    borderRadius: "10px",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      style={ownMessage ? ownMessageContainerStyle : otherMessageContainerStyle}
      ref={ref}
    >
      <img
        src={ownMessage ? userPic : data.user?.profilePic}
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
        {message.img && <img src={message.img} alt="Message" />}
        <p>{message.text}</p>
        <span
          style={{ color: "grey", alignSelf: ownMessage ? "end" : "start" }}
        >
          {message.date?.toDate().toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Message;
