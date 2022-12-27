import { Feather, AntDesign, Octicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import { Button, StyleSheet, Text, View } from "react-native";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import CreatePostsScreen from "../screens/main/CreatePostsScreen";
import Home from "../screens/main/Home";
import { useState } from "react";

export default function Main() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <NavigationContainer>
      {isLogin ? (
        <MainTab.Navigator>
          <MainTab.Screen
            name="Главная"
            component={Home}
            options={{
              tabBarStyle: styles.tabBar,
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="appstore-o" color={color} size={size} />
              ),
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
