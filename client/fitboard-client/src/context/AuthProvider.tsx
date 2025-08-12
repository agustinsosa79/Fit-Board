import  { type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useProvideAuth } from './useProvideAuth';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
