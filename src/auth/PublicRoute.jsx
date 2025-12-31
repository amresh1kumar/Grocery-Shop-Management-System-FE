import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function PublicRoute({ children }) {
   const { user } = useContext(AuthContext);

   if (user) {
      return <Navigate to="/stocks" replace />;
   }

   return children;
}
