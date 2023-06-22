import React, { useContext } from 'react'
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"

export default function Logout() {
  const { user, logout } = useContext(UserContext)

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h3>Logout Confirmation</h3>
      <p>Are you sure you want to log out?</p>
      <div className="logout-buttons">
        <button onClick={handleLogout}>
          Log out
        </button>
        <p>{user ? `${user.contact}, ${user.email}` : 'no user'}</p>
        <button>
          <Link to="/home-page">Cancel</Link>
        </button>
      </div>
    </div>
  )
}
