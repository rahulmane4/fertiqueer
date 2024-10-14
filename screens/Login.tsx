import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import GradientButton from "./theme/GradientButton"; // Adjust the path according to your file structure
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google"; 
import Appleauth from "@react-native-firebase/auth";
export default function LoginScreen({ navigation }) {
  // State variables
  const [isLoginView, setIsLoginView] = useState(true);
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Email validation regex
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Toggle secure entry for password input
  const toggleSecureEntry = () => setIsSecure((prev) => !prev);

  // Handle Google login
  const handleGoogle = async () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: "YOUR_ANDROID_CLIENT_ID",
      iosClientId: "YOUR_IOS_CLIENT_ID",
      webClientId: "YOUR_WEB_CLIENT_ID",
    });

    const result = await promptAsync();

    if (result?.type === "success") {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);

      try {
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;

        Alert.alert("Login Successful", `Welcome ${user.displayName}`);
        await AsyncStorage.setItem("@userLoginData", JSON.stringify(user));
      } catch (error) {
        Alert.alert("Login Error", error.message);
      }
    }
  };

  // Handle user login
  const handleLogin = async () => {
    if (!validateEmail(email))
      return setErrorMessage(
        "Invalid Email. Please enter a valid email address."
      );
    if (password.length < 4)
      return setErrorMessage("Weak Password. Minimum length is 4 characters.");
    if (!email || !password)
      return setErrorMessage("Please fill out all fields.");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const { displayName, email: userEmail, photoURL } = userCredential.user;

      // Optional: Store user data in AsyncStorage
      await AsyncStorage.setItem("@userLoginData", JSON.stringify(user));
      await AsyncStorage.setItem("userUID", userCredential.user.uid);
      await AsyncStorage.setItem("userName", displayName || "User");
      await AsyncStorage.setItem(
        "userPhoto",
        photoURL || "./assets/default-avatar.png"
      );
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      Alert.alert("Login Successful", `Welcome ${user.email}`);
      navigation.navigate("BottomTabs");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  // Helper function to get error messages
  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        return "Wrong password.";
      case "auth/user-not-found":
        return "No user found with this email.";
      default:
        return error.message;
    }
  };

 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Image style={styles.logo} source={require("./assets/app_icon.png")} />
        <Text style={styles.title}>Sign In to continue</Text>

        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email id"
          toggleSecureEntry={false}
          icon={false}
          secureTextEntry={false}
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry={isSecure}
          toggleSecureEntry={toggleSecureEntry}
          icon={isSecure ? "visibility-off" : "visibility"}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Forgot")}
          style={styles.forgotPassword}
        >
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <GradientButton title="SIGN IN" onPress={handleLogin} />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Divider text="Or sign in with" />
        <SocialButtons
          onGooglePress={handleGoogle}
          handleAppleLogin={handleGoogle}
        />

        <Text style={styles.switchText}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.replace("SignupScreen")}
            style={styles.linkText}
          >
            Create Free
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

// InputField component for email and password
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  toggleSecureEntry,
  icon,
}) => (
  <View style={styles.inputView}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputField}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {toggleSecureEntry && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
          <MaterialIcons name={icon} size={24} color="grey" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

// Divider component for social sign-in section
const Divider = ({ text }) => (
  <View style={styles.dividerContainer}>
    <View style={styles.line} />
    <Text style={styles.dividerText}>{text}</Text>
    <View style={styles.line} />
  </View>
);

// SocialButtons component for Google and Apple sign-in
const SocialButtons = ({ onGooglePress, handleAppleLogin }) => (
  <View style={styles.socialContainer}>
    <TouchableOpacity style={styles.socialButton}>
      <FontAwesome name="google" size={24} color="#DB4437" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
      <AntDesign name="apple1" size={24} color="#000" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 350,
    height: 70,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputView: {
    marginBottom: 10,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  label: {
    color: "black",marginVertical:5,
    fontSize: 14, fontWeight:'bold'
  },
  icon: {
    padding: 5,
  },
  input: {
    width: "90%",
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  forgotPassword: {
    marginTop: 10,
  },
  linkText: {
    color: "back",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "left",
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  dividerText: {
    marginHorizontal: 5,
    fontSize: 18,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  socialButton: {
    backgroundColor: "#e8e7e7",
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,    marginVertical:20,
    textAlign: "center",
    color: "#000",
  },
});
