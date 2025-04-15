import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/hooks/useAppStore";

const IndexModal = ({ modalVisible, setModalVisible }: any) => {
  const [password, setPassword] = useState("");
  const { removeDeveloper } = useAppStore();
  const handleConfirm = () => {
    if (!password) {
      return alert("Please enter your password");
    }
    removeDeveloper(password)
    console.log("Password:", password);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-zinc-900 rounded-2xl p-6 w-11/12 max-w-md items-center shadow-2xl border border-purple-500">
          <TouchableOpacity
            className="absolute top-4 right-4"
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#A8B5DB" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-white mb-3 text-center">
            Cancel Developer Status
          </Text>

          <Text className="text-gray-400 text-sm text-center mb-4">
            Are you sure you want to stop being a developer on DevNetwork?
          </Text>

          <TextInput
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor="#A8B5DB"
            value={password}
            onChangeText={setPassword}
            className="bg-zinc-800 text-white rounded-xl px-4 py-2 w-full mb-4 border border-zinc-700"
          />

          <TouchableOpacity
            className="bg-red-600 px-6 py-2 rounded-full w-full"
            onPress={handleConfirm}
          >
            <Text className="text-white font-semibold text-center">
              Cancel Developer Status
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default IndexModal;
