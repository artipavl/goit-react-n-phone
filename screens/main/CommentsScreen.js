import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ navigation, route }) => {
  const [coment, setComent] = useState("");
  const [data, setData] = useState([]);
  const { uid, userName } = useSelector((state) => state.auth);
  const item = route.params.item;

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const db = getFirestore();
      await onSnapshot(
        collection(db, "posts", item.id, "comand"),
        (snapshot) => {
          snapshot.docChanges().map((change) => {
            console.log(change.type);
            const post = {
              id: change.doc.id,
              ...change.doc.data(),
            };
            if (change.type === "added" && indexOfId(post.id) < 0) {
              console.log(post);
              setData((data) => [...data, post]);
            }
            if (change.type === "modified") {
              console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
              console.log("Removed city: ", change.doc.data());
            }
          });
        }
      );
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

  const addComent = async () => {
    try {
      const db = getFirestore();
      console.log(coment);
      const docRef = await addDoc(collection(db, "posts", item.id, "comand"), {
        coment,
        uid,
        userName,
      });
      console.log("Document written with ID: ", docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: item.photo,
            cache: "only-if-cached",
          }}
          style={styles.photo}
        />
      </View>
      <View>
        <FlatList
          style={styles.comentList}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.coments}>
              <Image
                // source={{
                //   uri: item.photo,
                //   cache: "only-if-cached",
                // }}
                // style={{ width: 60, height: 60, backgroundColor: "red" }}
                style={styles.userImg}
              />
              <View style={styles.coment}>
                <Text style={styles.comentText}>{item.coment}</Text>
                <Text
                  style={
                    uid == item.uid ? styles.comentDataUser : styles.comentData
                  }
                >
                  {Date.now()}
                </Text>
              </View>
            </View>
          )}
        />
        <SafeAreaView>
          <View style={styles.containerForm}>
            <TextInput
              style={styles.input}
              value={coment}
              onChangeText={setComent}
              placeholder="Комментировать..."
              placeholderTextColor="#BDBDBD"
            />
            <TouchableOpacity
              style={styles.comentSubBtn}
              onPress={addComent}
              activeOpacity="0.8"
            >
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
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
    overflow: "hidden",
    // minHeight: "100%",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    marginBottom: 32,
  },
  comentList: {
    // height: "100%",
    // minHeight: "100%",
    height: 400,
    overflow: "scroll",
  },
  coments: {
    flexDirection: "row",
  },
  userImg: {
    width: 24,
    height: 24,
    backgroundColor: "red",
    borderRadius: 50,
    marginRight: 16,
  },

  coment: {
    width: "100%",
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  comentUser: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  comentText: {
    fontFamily: "Roboto-400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  comentData: {
    fontFamily: "Roboto-400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "left",
  },
  comentDataUser: {
    fontFamily: "Roboto-400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
  containerForm: {
    position: "relative",
  },
  input: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 50,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,

    fontFamily: "Roboto-400",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  comentSubBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
export default CommentsScreen;
