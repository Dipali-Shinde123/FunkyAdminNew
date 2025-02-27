import { createContext, useContext } from 'react';

// User interface definition
interface User {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

// AuthContextType interface definition for the context value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (phone: string, password: string) => void;
}

// Create the context with an initial undefined value (it will be populated by AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, useAuth };