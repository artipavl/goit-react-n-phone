import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
import { Feather } from "@expo/vector-icons";

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
    <View style={styles.container}>
      <Text>PostsScreen</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image
              source={{
                uri: item.photo,
                cache: "only-if-cached",
              }}
              // style={{ width: 400, height: 400 }}
              style={styles.photo}
            />

            <Text style={styles.nameText}>{item.name}</Text>

            <View style={styles.interaction}>
              <TouchableOpacity
                style={styles.interactionBtn}
                onPress={() => navigation.navigate("Коментарии", { item })}
                activeOpacity="0.8"
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.coments}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.interactionBtn}
                onPress={() =>
                  navigation.navigate("Карта", { location: item.location })
                }
                activeOpacity="0.8"
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.location}>{item.locationUser}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  post: {
    marginBottom: 34,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  nameText: {
    fontFamily: "Roboto-500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },

  interaction: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 24,
  },
  interactionBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  coments: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  location: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 3,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
