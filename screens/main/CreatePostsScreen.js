import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { app, storage } from "../../firebase/config";
// import { getDatabase, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(() => Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [locationUser, setLocationUser] = useState("");
  const [location, setLocation] = useState(null);
  const { uid, userName } = useSelector((state) => state.auth);

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onSubmit = async (e) => {
    if (!photo || !name || !locationUser) {
      return console.log("test");
    }
    console.log(photo, name, locationUser, location);
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = Date.now().toString();

      const storage = getStorage();
      const storageRef = await ref(storage, `images/${postId}`);
      await uploadBytes(storageRef, file);
      const photoUrl = await getDownloadURL(storageRef);
      console.log("test ", photoUrl);

      await addPostData({
        uid,
        userName,
        photo: photoUrl,
        name,
        locationUser,
        location,
      });
      console.log("done");
      console.log(storageRef);

      resetForm();
      navigation.navigate("Публикации");
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setPhoto(null);
    setName("");
    setLocationUser("");
    console.log(photo);
  };

  const addPostData = async (post) => {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          {photo && (
            <View style={styles.cameraImageBox}>
              <Image
                source={{
                  uri: photo,
                }}
                style={styles.cameraImage}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef.current) {
                try {
                  const options = {
                    quality: 0.5,
                    base64: true,
                    skipProcessing: true,
                  };
                  const { uri } = await cameraRef.current.takePictureAsync(
                    options
                  );
                  await MediaLibrary.createAssetAsync(uri);
                  console.log(uri);
                  setPhoto(uri);
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <View>
        <View>
          <Text style={styles.photoInfortation}>
            {photo ? "Редактировать фото" : "Загрузите фото"}
          </Text>
        </View>
        <SafeAreaView style={{ marginTop: 32 }}>
          <View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoComplete="name"
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View style={{ position: "relative", marginTop: 16 }}>
            <View
              style={{
                position: "absolute",
                top: 13,
                left: 0,
                width: 24,
                height: 24,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="map-pin" size={18} color="#BDBDBD" />
            </View>

            <TextInput
              style={{
                ...styles.input,
                paddingLeft: 28,
              }}
              value={locationUser}
              onChangeText={setLocationUser}
              //   autoComplete=""
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <TouchableOpacity
            style={styles.subButton}
            onPress={onSubmit}
            activeOpacity="0.8"
          >
            <Text style={styles.buttonText}>Опубликовать</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <TouchableOpacity style={styles.trashButton} onPress={resetForm}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
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
  cameraImageBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "all",
  },
  cameraImage: {
    width: "100%",
    height: "100%",
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

export default CreatePostsScreen;
