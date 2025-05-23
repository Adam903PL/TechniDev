import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const _layout = () => {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        headerShadowVisible:false,
        tabBarStyle:{
          display:"none"
        }
      }}
    >
      <Tabs.Screen
        name="JoinDev"
        options={{
          title: "JoinDev",
          headerShadowVisible:false,
          headerShown:false,
          tabBarShowLabel:false
          
        }}
      />
    </Tabs>
  );
};

export default _layout;
