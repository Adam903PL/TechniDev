import  {create} from "zustand"

export const data = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDmN-o7HRXjcDKH-2hiQwDOkeJ8MQRgLO8w&s",
    bio: "Software engineer with a passion for mobile apps and AI.",
    phone: "123-456-7890",
    email: "alice.johnson@example.com",
    joined: "2024-01-15",
    skills: [
      { skill: "React Native" },
      { skill: "Python" },
      { skill: "Machine Learning" },
    ],
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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


interface Skills {
  skill:string
}

  
interface DataType {
    id:string;
    name:string;
    avatar:string;
    bio:string;
    phone:string;
    email:string;
    joined:string;
    skills:Skills[]
}

type NewDeveloper = Omit<DataType, "id">;
interface DataTypeSate {
    getData:DataType[]
    addDeveloper:(data:NewDeveloper) =>void
}


export const useData = create<DataTypeSate>((set,get)=>({
    getData: data,
    addDeveloper: (newDev) => {
      const newDeveloper: DataType = {
        id: Math.random().toString(36).substring(2, 9), 
        ...newDev,
      };
  
      set((state) => ({
        getData: [...state.getData, newDeveloper],
      }));
    },
}))