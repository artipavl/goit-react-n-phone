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
} from "react-native";
import image from "../../assets/Images/zvezdy.jpg";

function LoginScreen({navigation}) {
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
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>LOGIN</Text>
            </View>
            <SafeAreaView style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoComplete="email"
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View style={styles.button}>
                <Button title="Log in" onPress={onSubmit} />
              </View>
              <View style={styles.button}>
                <Button
                  title="go to register"
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
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
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    marginBottom: 50,
    alignItems: "center",
  },
  headerTitleText: {
    fontSize: 60,
    color: "#f0f8ff",
  },
  form: {
    alignItems: "center",
  },
  input: {
    width: 300,
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 16,
  },
  inputTitle: {
    marginBottom: 8,
    color: "#f0f8ff",
  },
  button: {
    marginTop: 16,
    width: 200,
  },
});
