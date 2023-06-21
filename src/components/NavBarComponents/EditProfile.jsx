import React from 'react'
import { Link } from "react-router-dom";

export default function EditProfile() {
  return (
    <div>
      Edit profile here
      <button>
        <Link to="/home-page">Back</Link>
      </button>
    </div>
  )
}
