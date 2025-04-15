import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
//@ts-ignore
import { MaterialIcons } from "react-native-vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useAppStore } from "@/hooks/useAppStore";
interface Skills {
  skill: string;
}

interface FormType {
  name: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  joined: string;
  skills: Skills[];
}

const JoinDev = () => {
  const [currentSkill, setCurrentSkill] = useState("");
  const { getData,addDeveloper} = useAppStore();
  const navigation = useNavigation();
  const [userId,setUserId] = useState("")
  const router = useRouter()





  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        console.log(userId)
        setUserId(userId);
      }
    };

    getUserId();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      name: "",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDmN-o7HRXjcDKH-2hiQwDOkeJ8MQRgLO8w&s", 
      bio: "",
      phone: "",
      email: "",
      joined: new Date().toISOString().split('T')[0], 
      skills: [],
    }
  });

  const skills = watch("skills") || [];

  const addSkill = () => {
    if (currentSkill.trim()) {
      setValue("skills", [...skills, { skill: currentSkill.trim() }]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setValue("skills", updatedSkills);
  };

  const onSubmit = (data: FormType) => {
    console.log("Submitted data:", data);

    

    const isDeveloper = getData.find((user)=>user.email === data.email )
    if(isDeveloper){
      Alert.alert("Fails", "Your are already a developer!");
      return
    }

    addDeveloper(data);
    Alert.alert("Success", "Your profile has been created!");
    navigation.goBack();
  };



  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="items-center mb-8">
          <Text className="text-purple-400 text-4xl font-bold">
            Join to <Text className="text-white">TechniDev</Text>
          </Text>
          <Text className="text-gray-400 mt-2">
            Connect with fellow developers
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-zinc-800 h-11 px-3 rounded-md mb-2.5  text-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-400 mb-2.5">{errors.name.message}</Text>
          )}
          
          <Text className="text-white mb-1">Avatar URL</Text>
          <Controller
            control={control}
            name="avatar"
            rules={{ required: "Avatar URL is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-zinc-800  h-11 px-3 rounded-md mb-2.5 text-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter avatar URL"
                placeholderTextColor="#999"
              />
            )}
          />
          {errors.avatar && (
            <Text className="text-red-400 mb-2.5">{errors.avatar.message}</Text>
          )}
          
          <Text className="text-white mb-1">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-zinc-800  h-11 px-3 rounded-md mb-2.5 text-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-400 mb-2.5">{errors.email.message}</Text>
          )}
          
          <Text className="text-white mb-1">Phone</Text>
          <Controller
            control={control}
            name="phone"
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-zinc-800  h-11 px-3 rounded-md mb-2.5 text-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && (
            <Text className="text-red-400 mb-2.5">{errors.phone.message}</Text>
          )}
          
          <Text className="text-white mb-1">Bio</Text>
          <Controller
            control={control}
            name="bio"
            rules={{ required: "Bio is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline={true}
                numberOfLines={4}
                className="bg-zinc-800  h-24 px-3 py-2 rounded-md mb-2.5 text-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your bio"
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            )}
          />
          {errors.bio && (
            <Text className="text-red-400 mb-2.5">{errors.bio.message}</Text>
          )}
          
          <Text className="text-white mb-1">Skills</Text>
          <View className="flex-row mb-2">
            <TextInput
              className="bg-zinc-800  flex-1 h-11 px-3 rounded-l-md text-white"
              value={currentSkill}
              onChangeText={setCurrentSkill}
              placeholder="Add a skill"
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              className="bg-purple-500 px-4 justify-center items-center rounded-r-md" 
              onPress={addSkill}
            >
              <Text className="text-white font-bold">Add</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row flex-wrap mb-4">
            {skills.map((item, index) => (
              <View key={index} className="bg-purple-700 rounded-full px-3 py-1 mr-2 mb-2 flex-row items-center">
                <Text className="text-white mr-1">{item.skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(index)}>
                  <MaterialIcons name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {errors.skills && (
            <Text className="text-red-400 mb-2.5">{errors.skills.message}</Text>
          )}

          <TouchableOpacity
            className="bg-purple-600 py-3 rounded-lg items-center mt-4"
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white font-bold text-lg">Join Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute left-4 bottom-8 bg-purple-500 w-16 h-16 rounded-full justify-center items-center"
      >
        <MaterialIcons name="keyboard-arrow-left" size={36} color="#D6C6FF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default JoinDev;