import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper"; // You can use other checkbox libraries if needed
import HorizontalLine from "./theme/HorizontalLine";
import GradientButton from "./theme/GradientButton"; // Adjust the path according to your file structure
import AsyncStorage from "@react-native-async-storage/async-storage";

const TermsAgreementScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(true);

  const handleContinue = async () => {
    if (checked) {
      //Alert.alert("Success", "You have agreed to the terms.");
      try {
        // Set flag in AsyncStorage to mark that intro has been viewed
        await AsyncStorage.setItem("@hasTermAccepted", "true");
        // Navigate to the Main Dashboard
        navigation.replace("Login");
      } catch (error) {
        console.log("Error setting AsyncStorage:", error);
      }
    } else {
      // Alert.alert("Error", "Please agree to the terms to continue.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.main_logo}
        source={require("./assets/app_icon.png")}
      />
      <HorizontalLine />
      <Text style={styles.paragraph}>
        Welcome to the fertiQueer app. We hope it provide you with helpful
        suggestions duting your family building journey.
      </Text>
      <Text style={styles.paragraph}>
        Please note that this app is not intended to diagnose, treat, or cure
        any medical or mental health conditions, and is not a substitute for the
        care of a healthcare provider
      </Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          color={checked ? "#4630EB" : "grey"} // Change color when checked
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        />
        <Text style={styles.checkboxLabel}>
          I accept the Terms and Conditions and Privacy policy.
        </Text>
      </View>
      <View style={styles.button}>
        <GradientButton title="CONTINUE" onPress={handleContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  colorText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "pink",
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16, // Set font size
    lineHeight: 24, // Adjust line height for spacing
    color: "#333", // Set text color
    textAlign: "justify", // Justify text alignment
    marginVertical: 10, // Vertical margin for spacing
    
    marginBottom: 30,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    padding: 10,
  },
  checkboxLabel: {
    fontSize: 16, // Set font size
    lineHeight: 24, // Adjust line height for spacing
    color: "#333", // Set text color
    textAlign: "justify", // Justify text alignment
    // Vertical margin for spacing
     
  },
  main_logo: {
    backgroundColor: "white",
    width: 250,
    height: 40,
    marginBottom: 5,marginTop:50,
  },
  button: {
    position: "absolute", // Fix the button position
    bottom: 20, // Distance from the bottom of the screen
    left: 20,
    right: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TermsAgreementScreen;
