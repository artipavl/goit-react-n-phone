import { Feather, AntDesign, Octicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
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
import { useEffect, useState } from "react";
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
import { added, snepshitComment } from "../redux/posts/postsOptions";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getPhotoURL } from "../firebase/options";

export default function Main() {
  const { uid, isLoggedIn, photoURL } = useSelector((state) => state.auth);
  // const [data, setData] = useState([]);
  // const [coments, setComents] = useState([]);
  // const navigation = useNavigation();
  // console.log("navigation", navigation);

  const dispatch = useDispatch();

  useEffect(() => {
    // isLoggedIn && getPosts();
    isLoggedIn && getPostsData();
    // dispatch(getPostsData());
    !isLoggedIn &&
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            authStateChangeUser({
              email: user.email,
              name: user.displayName,
              uid: user.uid,
              photoURL: user.photoURL,
            })
          );
          // return { email: user.email, name: user.phoneNumber, uid: user.uid };
        }
      });
  }, [isLoggedIn, getPostsData]);

  const getPostsData = async () => {
    try {
      const db = getFirestore();
      await onSnapshot(collection(db, "posts"), async (snapshot) => {
        await snapshot.docChanges().map(async (change) => {
          // console.log(change.type);
          // console.log("change", change);
          // test(change.doc.id);
          getComents(change.doc.id);

          const post = {
            id: change.doc.id,
            ...change.doc.data(),
            length: 0,
            comments: [],
            active: false,
          };
          if (change.type === "added") {
            // console.log("addPost", post);
            dispatch(added({ post }));
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
      dispatch(added(error));
    }
  };

  const getComents = async (id) => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(
        collection(db, "posts", id, "comand")
      );
      await querySnapshot.forEach(async (doc) => {
        // console.log("doc", doc.data());
        const photo =
          uid == doc.data().uid ? photoURL : await getPhotoURL(doc.data().uid);
        const comment = {
          id: doc.id,
          postId: id,
          photoURL: photo,
          ...doc.data(),
        };
        // console.log(comment);
        //  setData((data) => [...data, comment]);
        dispatch(snepshitComment({ comment }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTab.Navigator>
          <MainTab.Screen
            name="Главная"
            component={Home}
            options={({ route }) => {
              console.log(route);
              console.log(route[2]);
              console.log(route["Symbol(CHILD_STATE)"]);
              return {
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="appstore-o" color={color} size={size} />
                ),
                // tabBarStyle: route.name == "Публикации" && { display: "none" },
                // tabBarShow: route.name == "Публикации" && false,
              };
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
