import { useState, useContext } from 'react';
import './App.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage'
import ForgotPassword from './pages/ForgotPassword';
import UserProvider from './contexts/UserProvider'
import UserContext from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const user = useContext(UserContext)
  const [currForm, setCurrForm] = useState('login')

  function toggleForm(nextForm) {
    setCurrForm(nextForm)
  }

  let currPage;
  if (currForm === 'login') {
    currPage = <LogIn onFormSwitch={toggleForm} />;
  } else if (currForm === 'signup') {
    currPage = <SignUp onFormSwitch={toggleForm} />;
  } else if (currForm === 'main-page') {
    currPage = <MainPage onFormSwitch={toggleForm} />
  } else if (currForm === 'forgot-password') {
    currPage = <ForgotPassword onFormSwitch={toggleForm} />
  }
  return (
    <UserProvider>
      {currPage}
    </UserProvider>
  )



}

export default App
