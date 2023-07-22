import React from "react";
import Messages from "./Messages";
import Sidebar from "./Sidebar";

const MessageContainer = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "30%",
            borderRight: "1px solid lightgrey",
            height: "calc(100vh - 120px)",
          }}
        >
          <Sidebar />
        </div>
        <div style={{ width: "70%",}}>
          <Messages />
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
