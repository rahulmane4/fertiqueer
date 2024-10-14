// ChangePasswordScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { updatePassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import GradientButton from "./theme/GradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userDara, setUser] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [oldStoredPassword, setOldStoredPassword] = useState("");
  const handleChangePassword = async () => {
    const storedPassword = await AsyncStorage.getItem("userPassword"); // Assume 'userPassword' is the key for the stored password

    if (oldPassword === storedPassword) {
      const user = auth.currentUser;
      updatePassword(user, newPassword)
        .then(() => {
          alert("Password updated successfully");
          navigation.navigate("Login");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }else if(oldPassword.length==0 && newPassword.length==0){
      setErrorMessage("Enter Password");
    } else {
      setErrorMessage("Old password does not match.");
    }
  };

  useEffect(() => {
    setUser(JSON.stringify(auth.currentUser));
    loadOldPassword();
  }, []);
const loadOldPassword=async()=>{
  const storedPassword = await AsyncStorage.getItem("userPassword"); // Assume 'userPassword' is the key for the stored password
  setOldStoredPassword(storedPassword);
  console.log('storedPassword '+storedPassword);
}
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        
        <Text style={styles.title}> Enter Old Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Enter Old Password"
            onChangeText={(text) => setOldPassword(text)}
            value={oldPassword}
          />
        </View> 
        <Text style={styles.title}> Enter New Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
        </View>
        <GradientButton
          title="Change Password"
          onPress={handleChangePassword}
        />
        <Text style={styles.error_Message}>{errorMessage}</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePasswordScreen;

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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  error_Message: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20, color:'red',
    textAlign: "left",
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
});
