import React, { useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const values = {};
  return (
    <UserContext.Provider value={{ cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
