import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import UserContext from "../contexts/UserContext";
import { Alert } from "react-bootstrap";
import logo from "../assets/Logo.png";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(email);
      login(userData);

      navigate("/");
      // leads user to the home-page
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/user-not-found":
          setError("Account with that email does not exist");
          break;
        case "auth/wrong-password":
          setError("The password you entered is incorrect");
          break;
        case "auth/missing-password":
          setError("Please fill in your password");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        default:
          setError("Failed to log in");
      }
      setLoading(false);
    }
  };

  const fetchUserData = async (email) => {
    try {
      const usersCollectionRef = collection(db, "users");
      const queryByEmail = query(
        usersCollectionRef,
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(queryByEmail);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        return userData;
      }

      return null; // Return null if user data is not found
    } catch (error) {
      console.log("error caught: ", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form login-form">
        <img src={logo} />
        <hr />
        <h4 className="log-in-sign-up-title">Log In</h4>
        {error && (
          <Alert variant="danger" className="alert">
            {error}
          </Alert>
        )}
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Password"
        />

        <button disabled={loading} className="log-in-sign-up-button">
          Log In
        </button>

        <button className="no-account-button">
          <Link to="/signup">Don't have an account? Sign up here</Link>
        </button>

        <button className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
        </button>
      </form>
    </div>
  );
}
