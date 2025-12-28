// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//    const token = localStorage.getItem("token");

//    if (!token) {
//       return <Navigate to="/" replace />;
//    }

//    return children;
// }


import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
   const { user } = useContext(AuthContext);

   if (!user) {
      return <Navigate to="/" replace />;
   }

   return children;
}
