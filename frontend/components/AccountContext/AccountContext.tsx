import React, { createContext, useContext, useState, ReactNode } from "react";

interface UsernameStateProps {
  username: string | undefined;
  setUsername: (value: string) => void;
}

interface IsLoggedInProps {
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: (value: boolean) => void;
}

interface AppContextProps {
  usernameState: UsernameStateProps;
  isLoggedInState: IsLoggedInProps;
}

const AccountContext = createContext<AppContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  return (
    <AccountContext.Provider
      value={{
        usernameState: { username, setUsername },
        isLoggedInState: { isLoggedIn, setIsLoggedIn },
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
