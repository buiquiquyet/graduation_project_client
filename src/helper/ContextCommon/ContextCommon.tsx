import { UserFields } from "@/app/modules/user-management/constants/User.interface";
import React, { createContext, useContext, useState } from "react";

// Tạo context
const ContextCommon = createContext({
  isLoading: false, // loading
  setLoading: (loading: boolean) => {}, 
  isAuthenticated: false, // trạng thái sau khi login
  setAuthenticated: (authenticated: boolean) => {},
  dataUser: null, // phân quyền
  setDataUser: (dataUser: any) => {},
  
});

// Tạo provider cho context
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<UserFields|any>();

  return (
    <ContextCommon.Provider
      value={{
        isLoading,
        setLoading: setIsLoading,
        isAuthenticated,
        setAuthenticated: setIsAuthenticated,
        dataUser,
        setDataUser
      }}
    >
      {children}
    </ContextCommon.Provider>
  );
};

// Hook để sử dụng context
export const useContextCommon = () => {
  return useContext(ContextCommon);
};
