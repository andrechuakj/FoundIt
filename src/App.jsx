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

/*
test
  By right, all the pages that are not login/signup should be PrivateRoute,
  if not users can go to eg. /home/logout from the login page by simply
  typing it in the search bar, but lets settle that another day
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
          <Route path="/home-page/logout" element={<Logout />} />
          <Route path="/home-page/edit-profile" element={<EditProfile />} />
          <Route
            path="/home-page/view-personal-listings"
            element={<ViewPersonalListings />}
          />
          {/* <Route
            path="/home-page/LostFoundItemForm"
            element={<LostFoundItemForm />}
          /> */}
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
