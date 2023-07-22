import React, { useState, useContext, useEffect } from "react";
import Message from "./Message";
import attachFile from "../../assets/attachFile.png";
import send from "../../assets/send.png";
import { UserContext } from "../../contexts/UserContext";
import { ChatContext } from "../../contexts/ChatContext";
import {
  arrayUnion,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";

const Messages = () => {
  const { user } = useContext(UserContext);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: user.id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: user.id,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.id), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.id), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    data.chatId != "null" && (<>
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
            src={data.user?.profilePic}
            alt="Profile pic"
            style={{
              margin: "10px",
              borderRadius: "50%",
              height: "50px",
              width: "50px",
            }}
          />
          <p style={{ margin: "10px", font1ze: "18px", fontWeight: "bold" }}>
            {data.user?.name}
          </p>
        </div>

        <div
          style={{
            height: "100%",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid lightgrey",
          }}
        >
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
            id="file"
          />
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
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            style={{ border: "none", backgroundColor: "white" }}
          >
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
    </>)
  );
};

export default Messages;
