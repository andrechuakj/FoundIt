import React from "react";
import Messages from "./Messages";
import Sidebar from "./Sidebar";

const MessageContainer = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: "3",
            borderRight: "1px solid lightgrey",
            height: "calc(100vh - 120px)",
          }}
        >
          <Sidebar />
        </div>
        <div style={{ flex: "7"}}>
          <Messages />
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
