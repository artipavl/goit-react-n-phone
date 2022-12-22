import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
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
import image from "../../assets/Images/PhotoBG.jpg";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(email);
    console.log(password);

    Keyboard.dismiss();
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onCloseKeyboard}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <SafeAreaView style={styles.form}>
              <View style={styles.formTitle}>
                <Text style={styles.formTitleText}>Войти</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Адрес электронной почты"
                  autoComplete="email"
                />
              </View>
              <View style={{ marginTop: 16, marginBottom: 43 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Пароль"
                  autoComplete="password"
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
                activeOpacity="0.8"
              >
                <Text style={styles.buttonText}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linck}
                onPress={() => navigation.navigate("Register")}
                activeOpacity="0.8"
              >
                <Text style={styles.linckText}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formTitleText: {
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    display: 1,
    // alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 145,

    backgroundColor: "#ffffff",
  },
  formTitle: {
    marginBottom: 32,
    alignItems: "center",
  },
  input: {
    // display: 1,
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
    color: "#BDBDBD",
    // fontWeight: 400,
    // fontSize: 16,
    // lineHeight: 19,
  },
  inputTitle: {
    marginBottom: 8,
  },
  button: {
    display: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  linck: {
    display: 1,
    margin: "auto",
  },
  linckText: {
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
