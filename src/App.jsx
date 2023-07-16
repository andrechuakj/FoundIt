import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./PrivateRoute";
import Logout from "./pages/Logout";
import EditProfile from "./pages/EditProfile";
import ViewPersonalListings from "./pages/ViewPersonalListings";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessagesPage from "./pages/MessagesPage";

/*
  All the pages that are not login/signup/forgot-password are PrivateRoute
*/

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/home-page"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/home-page/logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/home-page/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/home-page/view-personal-listings"
            element={
              <PrivateRoute>
                <ViewPersonalListings />
              </PrivateRoute>
            }
          />
          <Route
            path="/home-page/messages"
            element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
