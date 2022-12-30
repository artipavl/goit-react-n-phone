import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, View, Image } from "react-native";
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

const PostsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

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

  return (
    <View>
      <Text>PostsScreen</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: item.photo,
                cache: "only-if-cached",
              }}
              style={{ width: 400, height: 400 }}
            />
            <Text style={{ color: "red" }}>{item.name}</Text>
            <Button
              onPress={() =>
                navigation.navigate("Карта", { location: item.location })
              }
              title="cart"
            />
            <Button
              onPress={() => navigation.navigate("Коментарии", { item })}
              title="coment"
            />
          </View>
        )}
      />
      <Button onPress={() => navigation.navigate("Карта")} title="cart" />
    </View>
  );
};

export default PostsScreen;
