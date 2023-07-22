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
import ViewMap from "./pages/ViewMap";

/*
  All the pages that are not login/signup/forgot-password are PrivateRoute
*/

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-personal-listings"
            element={
              <PrivateRoute>
                <ViewPersonalListings />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-map"
            element={
              <PrivateRoute>
                <ViewMap />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
