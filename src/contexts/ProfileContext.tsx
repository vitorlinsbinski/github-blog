import { ReactNode, createContext, useState } from "react";

interface UserContextType {
  isLoading: boolean;
  showLoading: () => void;
  removeLoading: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: UserContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  function showLoading() {
    setIsLoading(true);
  }

  function removeLoading() {
    setIsLoading(false);
  }

  return (
    <UserContext.Provider value={{ isLoading, showLoading, removeLoading }}>
      {children}
    </UserContext.Provider>
  );
}
