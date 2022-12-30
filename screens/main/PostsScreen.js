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

  const getPosts = async () => {
    try {
      const db = getFirestore();
      // const docRef = await doc(collection(db, "posts"));
      // const docSnap = await getDoc(collection(db, "posts"));
      // const q = query(collection(db, "posts"));
      // await onSnapshot(q, (doc) => {
      //   console.log("Current data: ", doc);
      // });
      // console.log(docSnap);
      // const docRef = await collection(db, "posts");
      // const doc = await getDocsFromCache(docRef);
      // console.log(doc.data());

      // const querySnapshot = await getDocs(collection(db, "posts"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });

      const unsubscribe = await onSnapshot(
        collection(db, "posts"),
        (snapshot) => {
          const data = snapshot.docChanges().map((change) => {
            return { id: change.doc.id, ...change.doc.data() };
          });
          console.log("data", data);
          setData(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

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
          </View>
        )}
      />
      <Button onPress={() => navigation.navigate("Карта")} title="cart" />
    </View>
  );
};

export default PostsScreen;
