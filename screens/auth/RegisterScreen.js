import { EvilIcons, AntDesign } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import image from "../../assets/Images/PhotoBG.jpg";
import { authSignUpUser } from "../../redux/auth/authOptions";
import { getDownloadURL, uploadBytes, ref, getStorage } from "firebase/storage";

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async () => {
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(image);

    dispatch(authSignUpUser({ name, password, email, image }));

    Keyboard.dismiss();
    setEmail("");
    setPassword("");
    setName("");
  };

  const test = async () => {
    console.log("asdasd");
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      console.log(picked);
      if (!picked.uri) {
        return;
      }
      setImage(picked.uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onCloseKeyboard}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <SafeAreaView style={styles.form}>
            <View style={styles.userImgBox}>
              <Image
                source={{
                  uri: image,
                }}
                // style={{ width: 60, height: 60, backgroundColor: "red" }}
                style={styles.userImg}
              />
              <TouchableOpacity
                style={
                  image
                    ? styles.inputLodoBtn
                    : { ...styles.inputLodoBtn, borderColor: "#FF6C00" }
                }
                onPress={test}
                activeOpacity="0.8"
              >
                {image ? (
                  <EvilIcons name="close" size={24} color="#E8E8E8" />
                ) : (
                  <AntDesign name="plus" size={13} color="#FF6C00" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.formTitle}>
              <Text style={styles.formTitleText}>Регистрация</Text>
            </View>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoComplete="name"
                    placeholder="Логин"
                    placeholderTextColor="#BDBDBD"
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    placeholder="Адрес электронной почты"
                    placeholderTextColor="#BDBDBD"
                  />
                </View>
                <View style={{ marginTop: 16, marginBottom: 43 }}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoComplete="password"
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                  />
                </View>
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={onSubmit}
              activeOpacity="0.8"
            >
              <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linck}
              onPress={() => navigation.navigate("Login")}
              activeOpacity="0.8"
            >
              <Text style={styles.linckText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formTitleText: {
    fontFamily: "Roboto-500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 79,

    backgroundColor: "#ffffff",
  },
  userImgBox: {
    // ...StyleSheet.absoluteFill,
    position: "absolute",
    right: "22.5%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
    // width: 120,
    // height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  inputLodoBtn: {
    position: "absolute",
    transform: [{ translateX: 12.5 }, { translateY: -12.5 }],
    top: 93,
    right: 0,

    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#fff",
  },
  formTitle: {
    marginBottom: 32,
    alignItems: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-400",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    // display: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  linck: {
    // display: 1,
    margin: "auto",
  },
  linckText: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
});
