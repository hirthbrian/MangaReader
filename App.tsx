import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";

import axios from "axios";
import { useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Chapter from "./src/screens/Chapter";
import Loading from "./src/components/Loading";
import { getChapters, getImages } from "./src/utils";

const URL = "https://us-central1-onepiece-31470.cloudfunctions.net/getChapters";

function App() {
  useKeepAwake();
  const [chapters, setChapters] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const [initialTitle, setInitialTitle] = useState("");

  const [loaded] = useFonts({
    InterMedium: require("./assets/fonts/Inter-Medium.otf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.otf"),
    InterBold: require("./assets/fonts/Inter-Bold.otf"),
    InterBlack: require("./assets/fonts/Inter-Black.otf"),
  });

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    getChapters().then((chapters) => {
      setInitialIndex(1);
      setChapters(chapters);
      setInitialTitle("test");
    });
  }, []);

  if (!loaded || initialIndex === 0 || initialTitle === "") {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <Chapter
        initialIndex={initialIndex}
        initialTitle={initialTitle}
        chapters={chapters}
      />
    </SafeAreaProvider>
  );
}

export default App;
