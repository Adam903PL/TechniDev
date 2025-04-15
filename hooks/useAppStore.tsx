
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Developer data
export const developerData = [
  {
    id: "f4b34a3a-cee8-42ef-ba06-caeb5bc147da",
    name: "Bob Smith",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDmN-o7HRXjcDKH-2hiQwDOkeJ8MQRgLO8w&s",
    bio: "Frontend developer and open source contributor.",
    phone: "234-567-8901",
    email: "bob.smith@example.com",
    joined: "2023-12-20",
    skills: [
      { skill: "JavaScript" },
      { skill: "React" },
      { skill: "Tailwind CSS" },
    ],
  },
  {
    id: "07b50773-f86e-400a-9397-ec6fabecf867",
    name: "Charlie Brown",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDmN-o7HRXjcDKH-2hiQwDOkeJ8MQRgLO8w&s",
    bio: "Backend developer working with cloud technologies.",
    phone: "345-678-9012",
    email: "charlie.brown@example.com",
    joined: "2022-06-30",
    skills: [
      { skill: "Node.js" },
      { skill: "AWS" },
      { skill: "PostgreSQL" },
    ],
  },
  {
    id: "be388ee9-b0e4-40c7-bc46-38150d44283b",
    name: "David Lee",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDmN-o7HRXjcDKH-2hiQwDOkeJ8MQRgLO8w&s",
    bio: "Full-stack developer passionate about machine learning.",
    phone: "456-789-0123",
    email: "david.lee@example.com",
    joined: "2021-09-10",
    skills: [
      { skill: "TypeScript" },
      { skill: "Next.js" },
      { skill: "TensorFlow" },
    ],
  },
  {
    id: "108d2885-c919-4891-8785-cc33a6823ece",
    name: "Eva Green",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDmN-o7HRXjcDKH-2hiQwDOkeJ8MQRgLO8w&s",
    bio: "UX/UI designer focused on user experience optimization.",
    phone: "567-890-1234",
    email: "eva.green@example.com",
    joined: "2020-03-25",
    skills: [
      { skill: "Figma" },
      { skill: "Adobe XD" },
      { skill: "Design Systems" },
    ],
  },
];

// User authentication data
export const userData = [
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

interface Skill {
  skill: string;
}

interface Developer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  joined: string;
  skills: Skill[];
}

interface User {
  id: string;
  email: string;
  password: string;
}

type NewDeveloper = Omit<Developer, "id">;

interface AppState {

  getData: Developer[];
  addDeveloper: (data: NewDeveloper) => Promise<void>;
  removeDeveloper: (password: string) => Promise<boolean>;
  
  currentUser: User | null;
  login: (credentials: Omit<User, "id">) => string | false;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
}

export const useAppStore = create<AppState>((set, get) => ({

  getData: developerData,
  
  currentUser: null,

  addDeveloper: async (newDev) => {
    try {
      const currentUser = get().currentUser;
      
      if (!currentUser) {
        console.error("User must be logged in to add a developer");
        return;
      }
      
      const generatedId = currentUser.id || crypto.randomUUID();
      
      const newDeveloper = {
        ...newDev,
        id: generatedId,
      };
      
      await AsyncStorage.setItem("userId", generatedId);
      
      set((state) => ({
        getData: [...state.getData, newDeveloper],
      }));
    } catch (error) {
      console.error("Failed to add developer:", error);
    }
  },
  
  removeDeveloper: async (password) => {
    try {
      const currentUser = get().currentUser;
      
      if (!currentUser) {
        console.warn("No user is logged in.");
        return false;
      }
      
      const userId = currentUser.id;
      console.log(currentUser.password,password,"this")
      const isPasswordCorrect = password === currentUser.password;
      
      if (!isPasswordCorrect) {
        console.warn("Invalid password.");
        return false;
      }
      
      set((state) => ({
        getData: state.getData.filter((dev) => dev.id !== userId),
      }));
      
      return true;
    } catch (error) {
      console.error("Failed to remove developer:", error);
      return false;
    }
  },
  

  login: ({ email, password }) => {
    const user = userData.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      AsyncStorage.setItem("userId", user.id);
      AsyncStorage.setItem("userEmail", user.email);
      AsyncStorage.setItem("isLoggedIn", "true");
      
      set({ currentUser: user });
      return user.id;
    }
    
    return false;
  },
  
  logout: async () => {
    try {

      await AsyncStorage.multiRemove(["userId", "userEmail", "isLoggedIn"]);
      set({ currentUser: null });
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
  
  checkAuthStatus: async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const userEmail = await AsyncStorage.getItem("userEmail");
      
      if (userId && userEmail) {
        const user = userData.find((user) => user.id === userId);
        if (user) {
          set({ currentUser: user });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false;
    }
  },
}));