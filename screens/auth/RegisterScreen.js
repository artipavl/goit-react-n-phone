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

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(email);
    console.log(password);
    console.log(name);

    Keyboard.dismiss();
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onCloseKeyboard}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Register</Text>
            </View>
            <SafeAreaView style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
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
                <Button title="Register" onPress={onSubmit} />
              </View>
              <Button
                title="go to login"
                onPress={() => navigation.navigate("Login")}
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
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
