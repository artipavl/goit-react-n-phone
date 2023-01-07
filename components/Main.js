import { Feather, AntDesign, Octicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import CreatePostsScreen from "../screens/main/CreatePostsScreen";
import Home from "../screens/main/Home";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  getDocsFromCache,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { authStateChangeUser } from "../redux/auth/authOptions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const MyContext = createContext("");

export default function Main() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(authStateChangeUser());
    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authStateChangeUser({
            email: user.email,
            name: user.phoneNumber,
            uid: user.uid,
          })
        );
        // return { email: user.email, name: user.phoneNumber, uid: user.uid };
      }
    });
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const db = getFirestore();
      await onSnapshot(collection(db, "posts"), (snapshot) => {
        snapshot.docChanges().map((change) => {
          console.log(change.type);
          const post = {
            id: change.doc.id,
            ...change.doc.data(),
          };
          if (change.type === "added" && indexOfId(post.id) < 0) {
            setData((data) => [post, ...data]);
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfId = (id) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].id == id) {
        return index;
      }
    }
    return -1;
  };
  //<MyContext.Provider value={data}></MyContext>
  return (
    <MyContext.Provider value={data}>
      <NavigationContainer>
        {isLoggedIn ? (
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
                    <TouchableOpacity
                      style={{ paddingLeft: 16 }}
                      onPress={() => navigation.goBack()}
                    >
                      <Feather name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
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
              // initialParams={{ data }}
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
    </MyContext.Provider>
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
