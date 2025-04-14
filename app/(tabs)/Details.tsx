import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useData } from "@/hooks/useData";
//@ts-ignore
import { MaterialIcons } from "react-native-vector-icons";

type RouteParams = {
  id: string;
};

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params as RouteParams;

  const { getData } = useData();
  const user = getData.find((item) => item.id === id?.id);

  if (!id || !user) {
    return (
      <SafeAreaView className="flex-1 bg-zinc-900 justify-center items-center">
        <Text className="text-5xl font-bold text-purple-500">
          {id ? "User not found" : "Loading..."}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <View className="flex-1 px-4 pt-6">
        <View className="items-center mb-8">
          <Text className="text-purple-400 text-4xl font-bold">
            Dev<Text className="text-white">Details</Text>
          </Text>
          <Text className="text-gray-400 mt-2">
            Connect with fellow developers
          </Text>
        </View>

        <View className="bg-zinc-700 p-4 rounded-lg">
          <Image
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full mb-4"
            resizeMode="cover"
          />
          <Text className="text-purple-500 text-lg font-medium">
            Name: {user.name}
          </Text>
          <Text className="text-gray-300 text-sm mt-2">Bio: {user.bio}</Text>
          <Text className="text-gray-400 text-sm mt-2">
            Email: {user.email}
          </Text>
          <Text className="text-gray-400 text-sm mt-2">
            Phone: {user.phone}
          </Text>
          <Text className="text-gray-500 text-xs mt-2">
            Joined: {user.joined}
          </Text>
        </View>
      </View>


      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="left-4 bottom-8  bg-purple-500 w-16 h-16 rounded-full justify-center items-center "
      >
        <MaterialIcons name="keyboard-arrow-left" size={36} color="#D6C6FF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Details;
