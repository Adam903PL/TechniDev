import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import "./globals.css";
import { useData } from "@/hooks/useData";

export default function Index() {
  const [selectedId, setSelectedId] = useState(null);
  const { getData } = useData();
  const [developers, setDevelopers] = useState(getData);
  const [searchQuery, setSearchQuery] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "React", value: "React" },
    { label: "Node.js", value: "Node.js" },
    { label: "Python", value: "Python" },
    { label: "UI/UX", value: "UI/UX" },
  ]);

  useEffect(() => {
    console.log("Selected skills:", value);

    let filteredDevs = getData;

    if (searchQuery.trim().length > 0) {
      filteredDevs = filteredDevs.filter((dev) =>
        dev.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (value && value.length > 0) {
      filteredDevs = filteredDevs.filter((dev) =>
        value.every((selectedSkill) =>
          dev.skills.some((skill) =>
            skill.skill.toLowerCase().includes(selectedSkill.toLowerCase())
          )
        )
      );
    }

    setDevelopers(filteredDevs);
  }, [searchQuery, value, open]);

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <View className="px-2 mb-4 w-1/2">
        <Link
          href={{ pathname: "/(tabs)/Details", params: { id: item.id } }}
          asChild
        >
          <TouchableOpacity
            className={`bg-zinc-800 rounded-2xl p-4 shadow-lg ${
              isSelected
                ? "border border-purple-500"
                : "border border-transparent"
            }`}
            activeOpacity={0.7}
            onPress={() => setSelectedId(item.id)}
          >
            <View className="items-center mb-3">
              <Image
                source={{ uri: item.avatar }}
                className="w-20 h-20 rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-purple-400 text-lg font-bold text-center mb-2">
              {item.name}
            </Text>
            <Text className="text-gray-300 text-sm text-center mb-1">
              {item.bio}
            </Text>

            <View className="flex-row flex-wrap justify-center gap-2 mt-2">
              {item.skills?.map((s, index) => (
                <View
                  key={index}
                  className="bg-purple-600/20 px-2 py-1 rounded-full"
                >
                  <Text className="text-purple-300 text-xs">{s.skill}</Text>
                </View>
              ))}
            </View>

            <View className="mt-3 pt-3 border-t border-zinc-700">
              <Text className="text-gray-400 text-xs">📱 {item.phone}</Text>
              <Text className="text-gray-400 text-xs mt-1">
                ✉️ {item.email}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    );
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-4 pt-6">
        <View className="items-center mb-8">
          <Text className="text-purple-400 text-4xl font-bold">
            Dev<Text className="text-white">Network</Text>
          </Text>
          <Text className="text-gray-400 mt-2">
            Connect with fellow developers
          </Text>
        </View>

        <View className="bg-zinc-800 rounded-xl p-3 mb-4 flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-white text-lg font-semibold mb-1">
              Developer Directory
            </Text>
            <Text className="text-gray-400 text-sm">
              Tap on a profile to view more details
            </Text>
          </View>
          <Link href="/(join)/JoinDev">
            <View className="items-end">
              <Text className="text-xs text-gray-400 text-right mb-1">
                Want to join as
              </Text>
              <Text className="text-xs font-semibold text-purple-400 text-right">
                a developer?
              </Text>
            </View>
          </Link>
        </View>

        <View className="flex-row items-center bg-zinc-800 rounded-xl px-4 py-2 mb-4">
          <TextInput
            placeholder="Find perfect developer..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#A8B5DB"
            className="flex-1 text-white"
          />
        </View>

        <View className="mb-4 z-50">
          <DropDownPicker
            multiple={true}
            min={0}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select skills"
            placeholderStyle={{ color: "#A8B5DB" }}
            style={{ backgroundColor: "#27272a", borderColor: "#3f3f46" }}
            dropDownContainerStyle={{
              backgroundColor: "#27272a",
              borderColor: "#3f3f46",
            }}
            textStyle={{ color: "white" }}
            labelStyle={{ color: "white" }}
            listItemLabelStyle={{ color: "white" }}
            theme="DARK"
          />
        </View>

        {developers.length > 0 ? (
          <>
            <FlatList
              data={developers}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <>
                  <View className="h-6" />
                  <Text className="text-purple-400 text-xl font-bold mb-2">
                    Developers
                  </Text>
                </>
              }
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </>
        ) : (
          <>
            <View className="items-center justify-center mt-20">
              <Text className="text-white text-xl font-bold mb-2">
                No developers found
              </Text>
              <Text className="text-gray-400 text-center px-8">
                We couldn't find any developers matching your search. Try
                adjusting your search terms or filters.
              </Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
