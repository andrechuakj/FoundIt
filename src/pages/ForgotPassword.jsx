import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-bootstrap";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox for further instructions");
      /*
        note: should not store password in Firebase as it is a security risk.
        Thus cannot update password in Firebase when user updates his password.
        But this code still works and user can still update his password.
      */
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
    console.log(error.code);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="reset-password-title">Reset Password</h1>
        {error && (
          <Alert variant="danger" className="alert">
            {error}
          </Alert>
        )}
        {message && (
          <Alert variant="success" className="alert">
            {message}
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

        <button disabled={loading} className="log-in-sign-up-button">
          Reset password
        </button>

        <button className="no-account-button">
          <Link to="/login">Back</Link>
        </button>
      </form>
    </div>
  );
}
