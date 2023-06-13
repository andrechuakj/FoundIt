import { useState } from 'react';
import './App.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {
 const [currForm, setCurrForm] = useState('login')

 function toggleForm(nextForm) {
  setCurrForm(nextForm)
 }

  return (
    <div>
      {
        currForm === 'login' ? <LogIn onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>
      }
    </div>
  )
}

export default App
