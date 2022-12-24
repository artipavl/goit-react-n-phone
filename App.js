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
import PostsScreen from "./screens/main/PostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";

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
    <NavigationContainer>
      {isLogin ? (
        <MainTab.Navigator>
          <MainTab.Screen
            name="Публикации"
            component={PostsScreen}
            options={{
              tabBarStyle: styles.tabBar,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="appstore-o" color={color} size={size} />
              ),
              headerTintColor: "#212121",
              headerTitleStyle: {
                fontWeight: "Roboto-500",
              },
              headerTitleAlign: "center",
              headerRight: () => (
                  <Feather
                    name="log-out"
                    size={24}
                    color="black"
                    // onPress={}
                  />
                )
              ,
            }}
          />
          <MainTab.Screen
            name="Создать публикацию"
            component={CreatePostsScreen}
            options={{
              tabBarShowLabel: false,
              tabBarShow: false,

              tabBarIcon: ({ color, size }) => (
                <View style={styles.buttonPlus}>
                  <Octicons name="plus" color={color} size={size} />
                </View>
              ),
              tabBarStyle: { display: "none" },
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                  <Feather
                    name="arrow-left"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                  />
                );
              },
              headerTintColor: "#212121",
              headerTitleStyle: {
                fontWeight: "Roboto-500",
              },
              headerTitleAlign: "center",
            }}
          />
          <MainTab.Screen
            name="Профиль"
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
        </MainTab.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonPlus: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  tabBar: {
    // backgroundColor: "red",
  },
});
