import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import the icons from vector-icons
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Image,
  Button,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import GradientButton from "./theme/GradientButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

import useResetNavigation from "./useResetNavigation";
const SignupScreen = ({ navigation }) => {
  const resetNavigation = useResetNavigation(navigation);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  // Function to handle form submission
  const handleSignup = () => {
    // Basic validation
    console.log(
      "Email:" + email + " Password: " + password + " CP:" + confirmPassword
    );
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Invalid Input,All fields are required.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage(
        "Weak Password, Password must be at least 6 characters long."
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password Mismatch, Passwords do not match.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Success", "Signup successful!");
        resetNavigation("Login");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    // If all validations pass

    // Here you can add your signup logic (e.g., Firebase signup)
  };
  const toggleView = () => {
    resetNavigation("Login");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Image
          style={styles.main_logo}
          source={require("./assets/app_icon.png")}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.lebal}>Email Address</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
        />
        <Text style={styles.lebal}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.lebal}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <GradientButton title="Sign Up" onPress={handleSignup} />
        <Text style={{ color: "red" }}>{errorMessage}</Text>
        {/* Top Text Section */}
        <View style={styles.textContainer}>
          <View style={styles.line} />
          <Text style={styles.textMiddle}>Or sign up with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.textContainer}>
          {/* Sign In Buttons */}
          <TouchableOpacity style={styles.circleSocial_btn}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleSocial_btn}>
            <AntDesign name="apple1" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.switchText}>
          Already have an account?{" "}
          <Text onPress={toggleView} style={styles.under_Text}>
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  main_logo: {
    backgroundColor: "white",
    width: 350,
    height: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  icon: {
    padding: 5,
  },
  lebal: {
    color: "black",marginVertical:5,
    fontSize: 14, fontWeight:'bold'
  },
  switchText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: "center",
    color: "#000", // Main text color
  },
  under_Text: {
    color: "#007BFF", // Different color for "Create Free"
    fontWeight: "bold", // Optional to make it bold
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  gradient: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 25,
  },

  button: {
    height: 90,
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden", // Ensures the gradient doesn't overflow outside the button
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
    marginTop: 10,
  },
  textMiddle: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
  },

  circleSocial_btn: {
    backgroundColor: "#e8e7e7",
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupScreen;
