import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, getStoredAuth, setStoredAuth, login as authLogin, register as authRegister, logout as authLogout } from './auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<User | null>;
  register: (data: {
    name: string;
    username: string;
    password: string;
    role: 'farmer' | 'admin';
    village?: string;
    adminRole?: 'admin' | 'extension_officer';
  }) => Promise<User | null>;
  logout: () => void;
  updateCurrentUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(getStoredAuth());

  useEffect(() => {
    const stored = getStoredAuth();
    setAuthState(stored);
  }, []);

  const login = async (username: string, password: string): Promise<User | null> => {
    const user = authLogin(username, password);
    if (user) {
      setAuthState({ user, isAuthenticated: true });
      return user;
    }
    return null;
  };

  const register = async (data: {
    name: string;
    username: string;
    password: string;
    role: 'farmer' | 'admin';
    village?: string;
    adminRole?: 'admin' | 'extension_officer';
  }): Promise<User | null> => {
    const user = authRegister(data);
    if (user) {
      setAuthState({ user, isAuthenticated: true });
      return user;
    }
    return null;
  };

  const logout = () => {
    authLogout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      setAuthState({ ...authState, user: updatedUser });
      setStoredAuth({ ...authState, user: updatedUser });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
