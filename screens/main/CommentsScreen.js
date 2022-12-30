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
} from "react-native";
import { useSelector } from "react-redux";

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
            console.log("post", post);
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
    <View>
      <View>
        <Text>CommentsScreen</Text>
        <Image
          source={{
            uri: item.photo,
            cache: "only-if-cached",
          }}
          style={{ width: 400, height: 400 }}
        />
        <Text style={{ color: "red" }}>{item.Coment}</Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text style={{ color: "red" }}>{item.coment}</Text>
            </View>
          )}
        />
        <SafeAreaView>
          <View>
            <TextInput
              style={styles.input}
              value={coment}
              onChangeText={setComent}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <Button onPress={addComent} title="cart" />
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
  },
  cameraContainer: {
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },

  flipContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    flex: 1,
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  photoInfortation: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  subButton: {
    // display: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 32,
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    // color: "#FFFFFF",
    color: "#BDBDBD",
  },

  trashButton: {
    fles: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  input: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-400",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
});
export default CommentsScreen;
