import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function SignUp(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log(email)
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
      <h1 className="log-in-sign-up-title">Sign Up</h1>
        <label htmlFor="name">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} 
          type="name" id="name" name="name" placeholder="Your name" />

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} 
          type="email" id="email" name="email" placeholder="Email" />

        <label htmlFor="tel">Contact number</label>
        <input value={contact} onChange={(e) => setContact(e.target.value)} 
          type="tel" id="tel" name="tel" placeholder="Contact number" />

        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" id="password" placeholder="Password" />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
          type="password" id="ConfirmPassword" placeholder="Confirm password" />

        <button className="log-in-sign-up-button">
          Sign up
        </button>

        <button onClick={() => props.onFormSwitch('login')} className="no-account-button">
          Already have an account? Log in here
        </button>
      </form>
    </div>
  )
}

