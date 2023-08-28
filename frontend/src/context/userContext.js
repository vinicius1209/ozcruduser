import React, { createContext } from "react";

import useUser from "./hooks/useUser";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { state, dispatch } = useUser();

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
