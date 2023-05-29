import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import axios from "axios";
import { useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ChapterList from "./src/screens/ChaptersList";
import Chapter from "./src/screens/Chapter";
import Loading from "./src/components/Loading";
import { getChapters, getImages } from "./src/utils";

function App() {
  useKeepAwake();

  const [loaded] = useFonts({
    InterMedium: require("./assets/fonts/Inter-Medium.otf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.otf"),
    InterBold: require("./assets/fonts/Inter-Bold.otf"),
    InterBlack: require("./assets/fonts/Inter-Black.otf"),
  });

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);

  const Stack = createNativeStackNavigator();

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ChapterList" component={ChapterList} />
        <Stack.Screen name="Chapter" component={Chapter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
