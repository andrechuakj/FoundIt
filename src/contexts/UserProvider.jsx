import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

/*
  This component will store the user information and make it accessible to
  its child components
*/

const UserProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = useState(initialUser);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== "null") {
      setUser(JSON.parse(storedUser));
    }
    setIsCheckingUser(false);
  }, []);

  useEffect(() => {
    if (!isCheckingUser) {
      // Navigate based on the user's login status
      if (user) {
        // User is logged in, navigate to home or other authenticated pages
        if (["/login", "/signup", "/forgot-password"].includes(window.location.pathname)) {
          navigate("/");
        }
      } else {
        // User is not logged in, navigate to login page
        if (!["/login", "/signup", "/forgot-password"].includes(window.location.pathname)) {
          navigate("/login");
        }
      }
    }
  }, [user, isCheckingUser]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    alert("you have successfully logged out");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
