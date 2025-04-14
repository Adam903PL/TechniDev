import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const data = [
  {
    id: "28c7e3d8-2e72-43a7-a5bf-eb5107cd556d",
    email: "alice.johnson@example.com",
    password: "password123",
  },
  {
    id: "f4b34a3a-cee8-42ef-ba06-caeb5bc147da",
    email: "bob.smith@example.com",
    password: "password123",
  },
  {
    id: "07b50773-f86e-400a-9397-ec6fabecf867",
    email: "charlie.brown@example.com",
    password: "password123",
  },
  {
    id: "be388ee9-b0e4-40c7-bc46-38150d44283b",
    email: "david.lee@example.com",
    password: "password123",
  },
  {
    id: "108d2885-c919-4891-8785-cc33a6823ece",
    email: "eva.green@example.com",
    password: "password123",
  },
];

interface User {
  id: string;
  email: string;
  password: string;
}

interface UsersState {
  currentUser: User | null;
  login: (credentials: Omit<User, "id">) => string | false;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
}

export const useUsers = create<UsersState>((set) => ({
  currentUser: null,
  
  login: ({ email, password }) => {
    const user = data.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      set({ currentUser: user });
      return user.id;
    }
    
    return false;
  },
  
  logout: async () => {
    try {
      // Clear all auth data from AsyncStorage
      await AsyncStorage.multiRemove(['userId', 'userEmail', 'isLoggedIn']);
      set({ currentUser: null });
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
  
  checkAuthStatus: async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userEmail = await AsyncStorage.getItem('userEmail');
      
      if (userId && userEmail) {
        const user = data.find(user => user.id === userId);
        if (user) {
          set({ currentUser: user });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  }
}));