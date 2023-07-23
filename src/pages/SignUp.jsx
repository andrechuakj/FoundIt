import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { Alert } from "react-bootstrap";
import noProfilePic from "../assets/profile.jpg";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (email, password, name, contact) => {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (name === "") {
      return setError("Please fill in your name");
    }
    if (contact === "") {
      return setError("Please fill in your contact number");
    }

    try {
      setError("");
      setLoading(true);

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Save user data to Cloud Firestore
      const userDocRef = doc(collection(db, "users"), user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        contact,
        password,
        id: user.uid,
        profilePic: noProfilePic,
      });
      await setDoc(doc(getFirestore(), "userChats", user.uid), {})
      resetInputFields();
      setSuccessMessage("Sign up successful!");
      console.log("User signed up successfully.");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Account with that email already exists");
          break;
        case "auth/missing-email":
          setError("Please fill in your email");
          break;
        case "auth/missing-password":
          setError("Please fill in your password");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters long");
          break;
        default:
          setError("Failed to create an account");
          console.log(error.code);
      }
    }
    setLoading(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleSignUp(email, password, name, contact);
  }

  function resetInputFields() {
    setName("");
    setEmail("");
    setContact("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="log-in-sign-up-title">Sign Up</h1>
        {successMessage && (
          <Alert variant="success" className="alert">
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="alert">
            {error}
          </Alert>
        )}
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          id="name"
          name="name"
          placeholder="Your name"
        />

        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />

        <label htmlFor="tel">Contact number</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          type="number"
          id="number"
          name="number"
          placeholder="Contact number"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Password"
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm password"
        />

        <button disabled={loading} className="log-in-sign-up-button">
          Sign up
        </button>

        <button className="no-account-button">
          <Link to="/">Already have an account? Log in here</Link>
        </button>
      </form>
    </div>
  );
}
