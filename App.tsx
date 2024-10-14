import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Home from "./screens/HomeScreen";
import Forgot from "./screens/Forgot";
import TermsAgreementScreen from "./screens/TermsAgreementScreen";
import IntroSliderScreen from "./screens/IntroSliderScreen";
import CategoryList from "./screens/CategoryList";
import Category_SubList from "./screens/Category_SubList";
import Category_SubItem_Details from "./screens/Category_SubItem_Details";
import ProfileScreen from "./screens/ProfileScreen";
import { StatusBar } from "react-native";
import Meditation from "./screens/Meditation";
import BottomTabs from "./screens/BottomTabs";
import SplashScreen from "./screens/SplashScreen";
import ChatScreen from "./screens/ChatScreen";

import { ThemeProvider } from "./screens/theme/ThemeContext";
import { LogBox } from "react-native";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoApp from "./screens/TodoApp";
import Counter from "./screens/Counter";
import FadeInView from "./screens/FadeInView";
import soundList from "./screens/soundList";
// import Auth from "./screens/Auth";

// import ErrorBoundary from './screens/ErrorBoundary';
const Stack = createNativeStackNavigator();
export default function App(): JSX.Element {
  LogBox.ignoreLogs([
    "Warning: ...", // Ignore specific log or warning
    "Some other warning",
  ]);
  return (
    // <ErrorBoundary>
    <> 
    <ThemeProvider>
      <NavigationContainer>
      
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            options={{ headerShown: false, title: "SplashScreen" }}
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen name="FadeInView" component={FadeInView} />
          <Stack.Screen
            options={{ headerShown: true, title: "Profile" }}
            name="ProfileScreen"
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: true, title: "Counter Login" }}
            name="Counter"
            component={Counter}
          />
            <Stack.Screen
            options={{ headerShown: true, title: "soundList" }}
            name="soundList"
            component={soundList}
          />

          <Stack.Screen
            options={{ headerShown: false, title: "" }}
            name="SignupScreen"
            component={SignupScreen}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false, title: "Home Dashbaord" }}
          />
          <Stack.Screen
            name="IntroSliderScreen"
            component={IntroSliderScreen}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="Meditation"
            component={Meditation}
            options={{ headerShown: true, title: "Meditation" }}
          />
          <Stack.Screen
            name="TermsAgreementScreen"
            component={TermsAgreementScreen}
            options={{ headerShown: false, title: "Terms Agreement Screenn" }}
          />
          <Stack.Screen
            name="TodoApp"
            component={TodoApp}
            options={{ headerShown: false, title: "Todo App Screenn" }}
          />

          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{ headerShown: true, title: "Change Password Screen" }}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={{ headerShown: true, title: "Forgot Password" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: true, title: "ChatScreen" }}
          />

          <Stack.Screen
            name="CategoryList"
            component={CategoryList}
            options={{ headerShown: true, title: " " }}
          />
          <Stack.Screen
            name="Category_SubList"
            component={Category_SubList}
            options={{ headerShown: true, title: " " }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: true, title: "Privacy Policy " }}
          />

          <Stack.Screen
            name="Category_SubItem_Details"
            component={Category_SubItem_Details}
            options={{ headerShown: true, title: "Category Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    </>
    //  </ErrorBoundary>
  );
}
// import { useEffect, useState } from "react";
// import { StyleSheet, Text, View, Button, Image } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [token, setToken] = useState("");
//   const [userInfo, setUserInfo] = useState(null);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: "907059726554-4ml4ilbpd27vd2mibg1olqk6upmjvi2o.apps.googleusercontent.com",
//     iosClientId: "",
//     webClientId: "907059726554-jcc411gue2eij0b9gb9dppqlbekdmvaf.apps.googleusercontent.com",//"907059726554-jcc411gue2eij0b9gb9dppqlbekdmvaf.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     handleEffect();
//   }, [response, token]);

//   async function handleEffect() {
//     const user = await getLocalUser();
//     console.log("user", user);
//     if (!user) {
//       if (response?.type === "success") {
//         // setToken(response.authentication.accessToken);
//         getUserInfo(response.authentication.accessToken);
//       }
//     } else {
//       setUserInfo(user);
//       console.log("loaded locally");
//     }
//   }

//   const getLocalUser = async () => {
//     const data = await AsyncStorage.getItem("@user");
//     if (!data) return null;
//     return JSON.parse(data);
//   };

//   const getUserInfo = async (token) => {
//     if (!token) return;
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const user = await response.json();
//       await AsyncStorage.setItem("@user", JSON.stringify(user));
//       setUserInfo(user);
//     } catch (error) {
//       // Add your own error handler here
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {!userInfo ? (
//         <Button
//           title="Sign in with Google"
//           disabled={!request}
//           onPress={() => {
//             promptAsync();
//           }}
//         />
//       ) : (
//         <View style={styles.card}>
//           {userInfo?.picture && (
//             <Image source={{ uri: userInfo?.picture }} style={styles.image} />
//           )}
//           <Text style={styles.text}>Email: {userInfo.email}</Text>
//           <Text style={styles.text}>
//             Verified: {userInfo.verified_email ? "yes" : "no"}
//           </Text>
//           <Text style={styles.text}>Name: {userInfo.name}</Text>
//           {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
//         </View>
//       )}
//       <Button
//         title="remove local store"
//         onPress={async () => await AsyncStorage.removeItem("@user")}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   card: {
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 15,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
// });
