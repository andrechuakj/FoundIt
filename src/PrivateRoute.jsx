import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);
  //const user = localStorage.getItem('user')

  return user ? children : <Navigate to="/login" />;
}

// export default function PrivateRoute({ children }) {
//   const { user } = useContext(UserContext);

//   return user ? (
//     <Route element={children} />
//   ) : (
//     <Navigate to="/" replace={true} />
//   );
// }
