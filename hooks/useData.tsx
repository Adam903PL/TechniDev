import  {create} from "zustand"

export const data = [

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

type NewDeveloper = DataType
interface DataTypeSate {
    getData:DataType[];
    addDeveloper:(data:NewDeveloper) =>void;
    checkIsDeveloper:(email:DataType["email"]) => boolean  
}


export const useData = create<DataTypeSate>((set,get)=>({
    getData: data,
    addDeveloper: (newDev) => {

      set((state) => ({
        getData: [...state.getData, newDev],
      }));
    },
    checkIsDeveloper: (email) => {
      const user = data.find((user)=>user.email === email)
      if(!user){
        return false
      }
      return true
    }
}))