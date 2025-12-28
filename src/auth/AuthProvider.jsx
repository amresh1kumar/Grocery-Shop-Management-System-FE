// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//    const [user, setUser] = useState(null);

//    useEffect(() => {
//       const token = localStorage.getItem("token");
//       if (token) {
//          setUser({ token }); // in real app: decode JWT or fetch profile
//       }
//    }, []);

//    return (
//       <AuthContext.Provider value={{ user, setUser }}>
//          {children}
//       </AuthContext.Provider>
//    );
// }


import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
   const [user, setUser] = useState(
      localStorage.getItem("token")
         ? { token: localStorage.getItem("token") }
         : null
   );

   const login = (token) => {
      localStorage.setItem("token", token);
      setUser({ token });
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null); // 🔥 MOST IMPORTANT LINE
   };

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
}
