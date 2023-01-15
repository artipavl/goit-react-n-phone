import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import image from "../../assets/Images/PhotoBG.jpg";
import { authSignInUser } from "../../redux/auth/authOptions";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(email);
    console.log(password);
    if (!email || password.length < 8) {
      return Alert.alert("Ошибка", "Заполните все поля", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

    Keyboard.dismiss();
    dispatch(authSignInUser({ password, email }));
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={onCloseKeyboard}>
      <View
        style={
          !keyboardStatus
            ? styles.container
            : { ...styles.container, marginBottom: -200 }
        }
      >
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <SafeAreaView style={styles.form}>
            <View style={styles.formTitle}>
              <Text style={styles.formTitleText}>Войти</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <View>
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
              </View>
            </KeyboardAvoidingView>
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
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

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
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 79,

    backgroundColor: "#ffffff",
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
