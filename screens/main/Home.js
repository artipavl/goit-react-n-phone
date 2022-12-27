import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather} from "@expo/vector-icons";


const HomeStack = createStackNavigator();

import { Text, View } from "react-native";
import PostsScreen from "./PostsScreen";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";

const Home = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
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
          ),
        }}
      />
      <HomeStack.Screen
        name="Карта"
        component={MapScreen}
        options={{
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Roboto-500",
          },
          headerTitleAlign: "center",
          headerLeft: () => {
            // const navigation = useNavigation();
            return (
              <Feather
                name="arrow-left"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
            );
          },
        }}
      />
      <HomeStack.Screen
        name="Коментарии"
        component={CommentsScreen}
        options={{
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Roboto-500",
          },
          headerTitleAlign: "center",
          headerLeft: () => {
            // const navigation = useNavigation();
            return (
              <Feather
                name="arrow-left"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default Home;
