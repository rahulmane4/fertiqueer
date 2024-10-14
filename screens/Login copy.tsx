import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import the icons from vector-icons
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import GradientButton from "./theme/GradientButton"; // Adjust the path according to your file structure
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
// import GoogleSignIn from "./GoogleSignIn";

//npx expo install expo-linear-gradient
export default function LoginScreen({ navigation }) {
  // State to toggle between login and registration view
  const [isLoginView, setIsLoginView] = useState(true);
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [reg_email, setRegEmail] = useState("");
  const [reg_password, setRegPassword] = useState("");
  const [reg_Con_password, setRegCon_Password] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const validateEmail = (email) => {
    // Simple regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  // Toggle the view between login and registration
  const toggleView = () => {
    navigation.replace("SignupScreen"); // Example navigation action
  };

  const handleGoogle = async () => {
    // Define the Google authentication request
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId:
        "8518678380-c5a55n3a4ogg9oadsiflql77lahk6p8v.apps.googleusercontent.com",
      iosClientId: "YOUR_IOS_CLIENT_ID", // Replace with your actual iOS client ID
      webClientId:
        "8518678380-56ml695ects1h19hbk35cvf2l7oh6ajp.apps.googleusercontent.com",
    });

    // Prompt the user for Google login
    const result = await promptAsync();

    // Check for success response
    if (result?.type === "success") {
      const { id_token } = result.params;

      try {
        // Create Firebase credential with the Google token
        const credential = GoogleAuthProvider.credential(id_token);

        // Sign in with credential
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;

        // Show success alert
        Alert.alert("Login Successful", `Welcome ${user.displayName}`);

        // Optionally, store user data in AsyncStorage
        await AsyncStorage.setItem(
          "@userLoginData",
          JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            accessToken: user.stsTokenManager.accessToken,
          })
        );
      } catch (error) {
        // Handle errors during login
        Alert.alert("Login Error", error.message);
      }
    }
  };
  const handleLogin = async () => {
    // Input validation
    if (!validateEmail(email)) {
      setErrorMessage("Invalid Email. Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setErrorMessage(
        "Weak Password. Password must be at least 4 characters long."
      );
      return;
    }

    if (!email) {
      setErrorMessage("Enter Email ID.");
      return;
    }

    if (!password) {
      setErrorMessage("Enter Password.");
      return;
    }

    try {
      // Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User successfully logged in:", userCredential.user);

      // Store login details in AsyncStorage

      const { displayName, email: userEmail, photoURL } = userCredential.user;
      const username = capitalizeFirstLetter(
        displayName || userEmail.split("@")[0]
      );

      // Prepare user data (use default photo if photoURL is null)
      const userData = {
        uid: userCredential.user.uid,
        name: username, // If displayName is null, set "User"
        email: userEmail,
        photo: photoURL || "https://example.com/default-avatar.png", // Default photo URL
        accessToken: userCredential.user.stsTokenManager.accessToken,
        refreshToken: userCredential.user.stsTokenManager.refreshToken,
      };

      // Store user data in AsyncStorage (optional)
      await AsyncStorage.setItem("userUID", userCredential.user.uid);
      await AsyncStorage.setItem("userName", username || "User");
      await AsyncStorage.setItem(
        "userPhoto",
        photoURL || "./assets/default-avatar.png"
      );
      await AsyncStorage.setItem("@userLoginData", JSON.stringify(userData));
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);

      Alert.alert("Login Successful", `Welcome ${userCredential.user.email}`);
      navigation.navigate("BottomTabs"); // Navigate to the next screen after login
    } catch (error) {
      // Error handling
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Wrong password.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email.");
      } else {
        setErrorMessage(error.message);
      }

      console.log("Error logging in:", error.message);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };

   
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View>
          <Image
            style={styles.main_logo}
            source={require("./assets/app_icon.png")}
          />
          <Text style={styles.title}>Sign In to continue</Text>
          <Text style={styles.lebal}>Email Address</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email id"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Text style={styles.lebal}>Password</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={isSecure}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
              <MaterialIcons
                name={isSecure ? "visibility-off" : "visibility"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot")}
            style={styles.icon}
          >
            <Text style={styles.lebal}>Forgot Password?</Text>
          </TouchableOpacity>

          <GradientButton title="SIGN IN" onPress={handleLogin} />
          <Text style={{ color: "red", fontSize: 16, textAlign: "left" }}>
            {errorMessage}
          </Text>
          {/* Top Text Section */}
          <View style={styles.textContainer}>
            <View style={styles.line} />
            <Text style={styles.textMiddle}>Or sign in with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.textContainer}>
            {/* Sign In Buttons */}
            <TouchableOpacity
              style={styles.circleSocial_btn} 
            >
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            {/* <GoogleSignIn/> */}
            <TouchableOpacity
              style={styles.circleSocial_btn}
              onPress={handleGoogle}
            >
              <AntDesign name="apple1" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.switchText}>
            Don't have an account?{" "}
            <Text onPress={toggleView} style={styles.under_Text}>
              Create Free
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
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
    color: "grey",
    fontSize: 12,
    marginTop: 10,
  },
  switchText: {
    fontSize: 16,
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
  input: {
    flex: 1,
    padding: 5,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8e7e7", // Google blue color
    padding: 15,
    marginVertical: 10,
    width: 80,
    justifyContent: "center",
    borderRadius: 50, // Ensures the button is circular
    overflow: "hidden",
  },
});
