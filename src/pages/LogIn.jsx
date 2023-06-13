import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function LogIn(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log(email)
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
      <h1 className="log-in-sign-up-title">Log In</h1>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email" />

        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password" />

        <button className="log-in-sign-up-button">
          Log In
        </button>
        <button onClick={() => props.onFormSwitch('signup')} className="no-account-button">
          Don't have an account? Sign up here
        </button>
      </form>
    </div>
  )
}

