export interface User {
  id: string;
  role: 'farmer' | 'admin';
  name: string;
  username: string;
  village?: string;
  adminRole?: 'admin' | 'extension_officer';
  coins: number;
  avatar: {
    hairstyle: string;
    skinTone: string;
    clothing: string;
    accessory: string;
  };
  lastSynced: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'beejsetu_auth';
const USERS_KEY = 'beejsetu_users';

export const getStoredAuth = (): AuthState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { user: null, isAuthenticated: false };
};

export const setStoredAuth = (auth: AuthState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const login = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username && password);

  if (user) {
    const authState: AuthState = { user, isAuthenticated: true };
    setStoredAuth(authState);
    return user;
  }

  return null;
};

export const register = (data: {
  name: string;
  username: string;
  password: string;
  role: 'farmer' | 'admin';
  village?: string;
  adminRole?: 'admin' | 'extension_officer';
}): User | null => {
  const users = getUsers();

  if (users.find(u => u.username === data.username)) {
    return null;
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    role: data.role,
    name: data.name,
    username: data.username,
    village: data.village,
    adminRole: data.adminRole,
    coins: 0,
    avatar: {
      hairstyle: 'Short',
      skinTone: 'default',
      clothing: 'Shirt',
      accessory: 'None'
    },
    lastSynced: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  const authState: AuthState = { user: newUser, isAuthenticated: true };
  setStoredAuth(authState);

  return newUser;
};

export const logout = () => {
  clearStoredAuth();
};

export const updateUser = (userId: string, updates: Partial<User>) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    users[index] = { ...users[index], ...updates, lastSynced: new Date().toISOString() };
    saveUsers(users);

    const auth = getStoredAuth();
    if (auth.user?.id === userId) {
      setStoredAuth({ ...auth, user: users[index] });
    }

    return users[index];
  }

  return null;
};

export const getAllUsers = (): User[] => {
  return getUsers();
};
