import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(UserContext)
  return user ? children : <Navigate to="/" replace />;
}



// export default function PrivateRoute({ path, element }) {
//   const { user } = localStorage.getItem('user')

//   return user ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/" replace={true} />
//   );
// }





