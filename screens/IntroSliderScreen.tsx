import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IntroSliderScreen = ({ navigation }) => {
  const slides = [
    {
      image: require("./assets/slider_1.png"),
      backgroundColor: "#ffffff",
    },
    {
      image: require("./assets/slider_2.png"),
      backgroundColor: "#ffffff",
    },
    {
      image: require("./assets/slider_3.png"),
      backgroundColor: "#ffffff",
    },
    {
      image: require("./assets/slider_4.png"),
      backgroundColor: "#ffffff",
    },
    {
      image: require("./assets/slider_5.png"),
      backgroundColor: "#ffffff",
    },
  ];

  // Render each slide item
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <StatusBar hidden barStyle="dark-content" backgroundColor="blue" />

      <Image source={item.image} style={styles.image} />
    </View>
  );

  // Render Next button
  const renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="arrow-forward-circle-outline"
        color="black"
        size={42}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );

  // Render Done button
  const renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="arrow-forward-circle-sharp"
        color="green"
        size={42}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );

  // Handle done action
  const onDone = async () => {
    try {
      // Set flag in AsyncStorage to mark that intro has been viewed
      await AsyncStorage.setItem("@hasViewedIntro", "true");
      // Navigate to the Main Dashboard
      navigation.navigate("TermsAgreementScreen");
    } catch (error) {
      console.log("Error setting AsyncStorage:", error);
    }
  };

  // Render Skip button
  const renderSkipButton = () => <Text style={styles.skipButton}>Skip</Text>;

  return (
    <ImageBackground
      source={require("./assets/app_background.png")} // Replace with your image path
      style={styles.background}
      resizeMode="cover" // Adjusts the image to cover the whole screen
    >
      <View style={styles.container}>
        <AppIntroSlider
          data={slides}
          renderItem={renderItem}
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          renderSkipButton={renderSkipButton}
          showSkipButton
          onDone={onDone}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonCircle: {
    // width: "100%",
    // marginTop: 5,
    // height: "100%",
    // marginRight: 20,
    width: 50,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
  },
  skipButton: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
    color: "black",
  },
});

export default IntroSliderScreen;
