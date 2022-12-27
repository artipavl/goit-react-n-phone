import React from "react";
import { Button, Text, View } from "react-native";

const PostsScreen = ({ navigation }) => (
  <View>
    <Text>PostsScreen</Text>
    <Button onPress={() => navigation.navigate("Карта")} title='cart'/>
  </View>
);

export default PostsScreen;
