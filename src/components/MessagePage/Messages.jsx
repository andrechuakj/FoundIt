import React, { useState, useContext } from "react";
import Message from "./Message";
import attachFile from "../../assets/attachFile.png";
import send from "../../assets/send.png";
import { UserContext } from "../../contexts/UserContext";

const Messages = () => {
  const { user } = useContext(UserContext);
  const userPic = `${user.profilePic}`;

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "70px",
            backgroundColor: "#9febff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={userPic}
            alt="Profile pic"
            style={{
              margin: "10px",
              borderRadius: "50%",
              height: "50px",
              width: "50px",
            }}
          />
          <p style={{ margin: "10px", fontSize: "18px" }}>UserName</p>
        </div>

        <div
          style={{
            height: "100%",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <Message ownMessage={true} />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid lightgrey",
          }}
        >
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <img
              src={attachFile}
              alt=""
              style={{
                margin: "10px",
                height: "30px",
                width: "30px",
                cursor: "pointer",
              }}
            />
          </label>
          <input
            placeholder="Write a message..."
            style={{
              border: "none",
              width: "100%",
              borderRadius: "0px",
            }}
          />
          <button style={{ border: "none", backgroundColor: "white" }}>
            <img
              src={send}
              alt="Send message"
              style={{
                margin: "10px",
                height: "30px",
                width: "30px",
                cursor: "pointer",
                border: "none",
                objectFit: "cover",
              }}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Messages;
