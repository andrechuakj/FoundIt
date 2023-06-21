import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'

/*
  This component will store the user information and make it accessible to
  its child components
*/

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(storedUser)
    }
    console.log('2')
  }, []);


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('3')
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
