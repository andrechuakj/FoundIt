import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'

/*
  This component will store the user information and make it accessible to
  its child components
*/

const UserProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== "null") {
      if (['/', '/signup', '/forgot-password'].includes(window.location.pathname)) {
        navigate('/home-page')
      }
      setUser(JSON.parse(storedUser));
      console.log(storedUser)
    } else {
      navigate('/')
      console.log(storedUser)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/')
    alert('you have successfully logged out')
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
