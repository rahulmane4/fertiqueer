import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import GradientButton from "./theme/GradientButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
//npx expo install expo-linear-gradient
export default function Forgot({ navigation }) {
  // State to toggle between login and registration view
  const [isLoginView, setIsLoginView] = useState(true);
  const [isSecure, setIsSecure] = useState(true);
  const [emailId, setemailId] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = () => {
    // Here you would typically dispatch an action to send a reset password link
    // For this example, we'll just simulate a success message
    if (emailId) {
      sendPasswordResetEmail(auth, emailId)
        .then(() => {
          alert("Password reset email sent!");
          navigation.navigate("Login");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
      setMessage(
        "A reset link has been sent to your registered email ID. " +
          maskEmail(emailId)
      );
      setemailId("");
    } else {
      setMessage("Please enter your registered email ID.");
    }
  };
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  // Toggle the view between login and registration
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };
  const maskEmail = (email) => {
    // Split the email into user and domain parts
    const [user, domain] = email.split("@");
    // Get the domain extension (.com)
    const domainParts = domain.split(".");
    const domainExtension = domainParts.pop(); // Get the last part (.com)
    const domainName = domainParts.join("."); // Join the remaining parts of the domain

    // Mask the user part
    const maskedUser = user.length > 2 ? user.slice(0, 2) + "****" : user; // Keep first 2 chars, mask the rest

    // Mask the domain part, keeping the last 4 characters
    const maskedDomain =
      domain.length > 4
        ? "****." + domainName.split(".").pop() // Mask domain but keep extension
        : domain; // Keep as is if less than 4 chars

    // Construct the masked email
    return `${maskedUser}@${"******" + email.slice(-4)}`;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.main_logo}
        source={require("./assets/app_icon.png")}
      />
      {/* <Text style={styles.title}>Forgot Password</Text> */}

      <Text style={styles.note}>
        Enter your registered email ID to receive a reset password link.
      </Text>
      <Text style={styles.lebal}>Email Address</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email id"
          value={emailId}
          onChangeText={setemailId}
        />
      </View>
      {/* <Text style={styles.lebal}>Mobile Number</Text>
      <View style={styles.inputView}>
        <TextInput style={styles.input} placeholder="Enter Mobile No (optional)" />
      </View> */}

      <GradientButton title="Forgot Password" onPress={handleResetPassword} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  emailText: {
    fontSize: 18,
    color: "#000",
  },
  main_logo: {
    backgroundColor: "white",
    width: 350,
    marginTop: 100,
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
    padding: 10,
    margin: 5,
  },
  note: {
    marginBottom: 12,
    fontSize: 16,
    marginTop: 50,
    textAlign: "center",
  },
  message: {
    marginTop: 12,
    textAlign: "center",
    color: "green",
  },
  lebal: {
    color: "grey",
    fontSize: 12,
    marginTop: 10,
  },

  switchText: {
    marginTop: 20,
    textAlign: "center",
  },
  under_Text: {
    color: "black",
    marginLeft: 10,
    paddingLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    height: 90,
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden", // Ensures the gradient doesn't overflow outside the button
  },
});
