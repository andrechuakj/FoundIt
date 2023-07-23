import React, { createContext, useContext, useState, useReducer } from "react";
import UserContext from "./UserContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user.id > action.payload.id
              ? user.id + action.payload.id
              : action.payload.id + user.id,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const [search, setSearch] = useState(null);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, search, setSearch }}>
      {children}
    </ChatContext.Provider>
  );
};
