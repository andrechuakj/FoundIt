import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function MainPage({ onFormSwitch }) {
  const { user, logout } = useContext(UserContext)

  const handleLogout = () => {
    logout()
    onFormSwitch('login')
  }

  return (
    <div>
      <h1>Welcome, {user ? `name: ${user.name}, email:${user.email}, contact:${user.contact}, password:${user.password}` 
      : 'no user'}</h1>
      <button onClick={handleLogout}>
        Log out
      </button>
      <button onClick={() => onFormSwitch('login')}>
        go back
      </button>
    </div>
  )
}