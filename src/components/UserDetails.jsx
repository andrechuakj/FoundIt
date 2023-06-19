import React, { useEffect, useState } from 'react'

export default function UserDetails({ authUser, userSignOut }) {
  /*
    This page contains all the user details once they logged in, so this displays 
    their email, name, contact number etc
    Also this should be a component, not a page
  */
  return (
    <div className="auth-details-container">
      <App authUser={authUser} userSignOut={userSignOut} />
    </div>
  )

}



