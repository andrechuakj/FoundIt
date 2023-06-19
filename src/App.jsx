import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import ForgotPassword from "./pages/ForgotPassword";
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/main-page"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
