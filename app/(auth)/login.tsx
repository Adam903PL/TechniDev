import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useUsers } from "@/hooks/useUsers";
import { useNavigation } from "expo-router";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useUsers();
  const navigate = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    const resp = login({ email: data.email, password: data.password });
    if (resp) {
      Alert.alert("Login Success", `Welcome, ${data.email}`);
      navigate.navigate("(home)/index");
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-4 pt-6">
        <View className="items-center mb-8">
          <Text className="text-purple-400 text-4xl font-bold">
            Techni<Text className="text-white">Dev</Text>
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-zinc-800 h-11 px-3 rounded-md mb-2.5 text-white"
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-400 mb-2.5">{errors.email.message}</Text>
          )}

          <Text className="text-white mb-1">Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-zinc-800 h-11 px-3 rounded-md mb-2.5 text-white"
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-400 mb-2.5">
              {errors.password.message}
            </Text>
          )}

          <TouchableOpacity
            className="bg-purple-600 py-3 rounded-lg items-center mt-4"
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
