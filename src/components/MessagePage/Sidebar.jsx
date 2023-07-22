import React, { useEffect, useState, useContext } from "react";
import SidebarProfile from "./SidebarProfile";
import Search from "./Search";
import { doc, onSnapshot } from "firebase/firestore";
import UserContext from "../../contexts/UserContext";
import { db } from "../../firebase";
import { ChatContext } from "../../contexts/ChatContext";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.id), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.id && getChats();
  }, [user.id]);

  

  return (
    <>
      <div style={{ overflow: "scroll", height: "calc(100vh - 120px)" }}>
        <Search />
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <SidebarProfile
              key={chat[0]}
              data={chat}
            />
          ))}
      </div>
    </>
  );
};

export default Sidebar;
