import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function MainPage() {
  const { user, logout } = useContext(UserContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <h1>Welcome, {user ? `name: ${user.name}, email:${user.email}, contact:${user.contact}, password:${user.password}` 
      : 'no user'}</h1>
      <button onClick={handleLogout}>
        Log out
      </button>
      <button>
        go back
      </button>
    </div>
  )
}