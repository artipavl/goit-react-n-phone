import * as React from "react";
import { Feather, AntDesign, Octicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { useCallback, useState } from "react";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { Button, StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import Home from "./screens/main/Home";
import { Provider } from "react-redux";
import Main from "./components/Main";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const [isLogin, setIsLogin] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loaded</Text>;
  }
  onLayoutRootView();

  return (
   <Provider store = {store}><Main /></Provider>
  );
}

// const styles = StyleSheet.create({
//   buttonPlus: {
//     backgroundColor: "#FF6C00",
//     width: 70,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 100,
//   },
//   tabBar: {
//     // backgroundColor: "red",
//   },
// });
