import { StyleSheet, SafeAreaView, Text, Image, View } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AnimatedTabBar from "./components/AnimatedTabBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileScreen";
import Meditation from "./Meditation";
import { ThemeContext } from "./theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
type Props = {};

const { Navigator, Screen, Group } = createBottomTabNavigator();
const BottomTabs = (props: Props) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Navigator
        screenOptions={{
          headerShown: true,
        }}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Screen
          name="fertiQueer"
          options={{
            tabBarIcon: (active) =>
              active ? (
                <>
                  <LinearGradient
                    colors={[
                      "#3f70df",
                      "#5265d2",
                      "#287cec",
                      "#1394ca",
                      "#0dc155",
                      "#73c43b",
                      "#e8c71e",
                      "#f39e17",
                      "#e6722f",
                      "#df5d3a",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientCircle}
                  >
                    <Ionicons name="home" color="white" size={30} />
                    <Text style={[styles.tabLabel, { color: "white" }]}>
                      Home
                    </Text>
                  </LinearGradient>
                </>
              ) : (
                <View style={styles.tabLabel_unselect}>
                  <Ionicons name="home-outline" color="white" size={30} />
                  <Text style={{ color: "white",fontSize:12, }}>
                    Home
                  </Text>
                </View>
              ),
          }}
          component={HomeScreen}
        />
        <Screen
          name="Meditation"
          options={{
            tabBarIcon: (active) =>
              active ? (
                <>
                  <LinearGradient
                    colors={[
                      "#3f70df",
                      "#5265d2",
                      "#287cec",
                      "#1394ca",
                      "#0dc155",
                      "#73c43b",
                      "#e8c71e",
                      "#f39e17",
                      "#e6722f",
                      "#df5d3a",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientCircle}
                  >
                    <MaterialCommunityIcons
                      style={styles.categoryIcon}
                      name="meditation"
                      color="white"
                      size={30}
                    />
                    <Text style={[styles.tabLabel, { color: "white" }]}>
                      Meditation
                    </Text>
                  </LinearGradient>
                </>
              ) : (
                <View style={styles.tabLabel_unselect}>
                  <MaterialCommunityIcons
                    name="meditation"
                    style={styles.categoryIcon}
                    color="white"
                    size={30}
                  />
                  <Text style={{ color: "white",fontSize:12, }}>Meditation</Text>
                </View>
              ),
          }}
          component={Meditation}
        />
        <Screen
          name="Chat"
          options={{
            tabBarLabel: "Chart",

            tabBarIcon: (active) =>
              active ? (
                <>
                  <MaterialCommunityIcons
                    style={styles.categoryIcon}
                    name="chat"
                    color="white"
                    size={30}
                  />
                  <Text style={[styles.tabLabel, { color: "white" }]}>
                    Chat
                  </Text>
                </>
              ) : (
                <View style={styles.tabLabel_unselect}>
                  <MaterialCommunityIcons
                    name="chat-outline"
                    style={styles.categoryIcon}
                    color="white"
                    size={30}
                  />
                  <Text style={{ color: "white",fontSize:12, }}>Chat</Text>
                </View>
              ),
          }}
          component={ChatScreen}
        />
        <Screen
          name="Profile"
          options={{
            tabBarIcon: (active) =>
              active ? (
                <>
                  <LinearGradient
                    colors={[
                      "#3f70df",
                      "#5265d2",
                      "#287cec",
                      "#1394ca",
                      "#0dc155",
                      "#73c43b",
                      "#e8c71e",
                      "#f39e17",
                      "#e6722f",
                      "#df5d3a",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientCircle}
                  >
                    <Ionicons name="settings" color="white" size={30} />
                    <Text style={[styles.tabLabel, { color: "white" }]}>
                      Profile
                    </Text>
                  </LinearGradient>
                </>
              ) : (
                <View style={styles.tabLabel_unselect}>
                  <Ionicons name="settings-outline" color="white" size={30} />

                  <Text style={{ fontSize:12,color: "white" }}>Profile</Text>
                </View>
              ),
          }}
          component={ProfileScreen}
        />
      </Navigator>
    </SafeAreaView>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  categoryIcon: {
    transform: [{ rotate: "0deg" }],marginLeft:5,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
  },
  tabLabel_unselect: {
    fontSize: 10,
    marginTop: 40,
    textAlign: "center",
  },
  gradientCircle: {
    width: 65,
    height: 65,
    borderRadius: 30,marginBottom:10,
    justifyContent: "center",
    alignItems: "center",
  },
});
