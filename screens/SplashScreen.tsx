import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import useResetNavigation from "./useResetNavigation";

const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const resetNavigation = useResetNavigation(navigation);
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasViewedIntro = await AsyncStorage.getItem("@hasViewedIntro");
        const hasTermAccepted = await AsyncStorage.getItem("@hasTermAccepted");

        const userName = await AsyncStorage.getItem("userName");

        console.log("Screen hasTermAccepted: " + hasTermAccepted);
        console.log("Screen hasViewedIntro: " + hasViewedIntro);
        console.log("Login User : " + userName);
        if (userName !== null && userName !== undefined) {
        
          resetNavigation('BottomTabs')
        } else {
          // Navigate based on AsyncStorage values
          if (hasViewedIntro === null) {
            // First time launch, show the introduction screen
             
            resetNavigation('IntroSliderScreen')
          } else {
            // Not first time launch, navigate to Login
             
            resetNavigation('Login')
          }
        }
      } catch (error) {
        console.log("Error reading AsyncStorage:", error);
      } finally {
        setLoading(false); // Stop loading when finished
      }
    };

    // Delay the check for a smoother splash experience
    const timer = setTimeout(() => {
      checkFirstLaunch();
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  if (loading) {
    // Show a loading indicator while checking AsyncStorage
    return (
      <ImageBackground
        source={require("./assets/splash.png")} // Replace with your image path
        style={styles.background}
        resizeMode="cover" // Adjusts the image to cover the whole screen
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("./assets/splash.png")} // Replace with your image path
      style={styles.background}
      resizeMode="cover" // Adjusts the image to cover the whole screen
    >
      <View style={styles.container}>
        {/* You can add any logo or loading indicator here */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
