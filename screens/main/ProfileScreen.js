import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  Platprofile,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import image from "../../assets/Images/PhotoBG.jpg";
import { MyContext } from "../../components/Main";
import { authSignInUser } from "../../redux/auth/authOptions";
import { async } from "@firebase/util";

function ProfileScreen({ navigation, datas, route }) {
  // let data = route.params;
  const ollData = useContext(MyContext);
  const { uid, email, photoURL, userName } = useSelector((state) => state.auth);

  const data = ollData.filter((item) => item.uid === uid);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.profile}>
          <Image
            source={{
              uri: photoURL,
              cache: "only-if-cached",
            }}
            // style={{ width: 60, height: 60, backgroundColor: "red" }}
            style={styles.userImg}
          />
          <View style={styles.profileTitle}>
            <Text style={styles.profileTitleText}>{userName}</Text>
          </View>
          <TouchableOpacity
            style={styles.logOut}
            onPress={() => dispatch(authStateSignOut())}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <FlatList
            style={styles.list}
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
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImg: {
    // ...StyleSheet.absoluteFill,
    position: "absolute",
    right: "50%",
    transform: [{ translateX: 30 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 147,
  },
  profileTitle: {
    marginBottom: 33,
  },
  profileTitleText: {
    fontFamily: "Roboto-500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  profile: {
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    // paddingBottom: 79,

    backgroundColor: "#ffffff",
  },
  logOut: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  list: {
    maxHeight: 421,
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
