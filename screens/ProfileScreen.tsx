// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   SafeAreaView,
//   Text,
//   Image,
//   Button,
//   Alert,
//   TextInput,
//   Switch,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import Colors from "../Colors";

// import { FontAwesome } from "@expo/vector-icons";
// import { ThemeContext } from "./theme/ThemeContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// function ProfileScreen({ navigation }) {
//   const themeContext = useContext(ThemeContext);
//   const [userName, setUserName] = useState("");
//   const [uID, setUId] = useState("");
//   const [email, setEmail] = useState("");

//   const [userPhoto, setUserPhoto] = useState('');
//   if (!themeContext) {
//     return null;
//   }

//   const { theme, toggleTheme } = themeContext;
//   const callLogout = async () => {
//     await AsyncStorage.setItem("userUID", "");
//     await AsyncStorage.setItem("userName", "");
//     await AsyncStorage.setItem("userPhoto", "");
//     await AsyncStorage.setItem("@userLoginData", "");
//     await AsyncStorage.setItem("userEmail", "");
//     await AsyncStorage.setItem("userPassword", "");
//     navigation.navigate("Login");
//   };

//   useEffect(() => {
//     fetch_StoredUser();
//   }, []);
//   const fetch_StoredUser = async () => {
//     const userUID = await AsyncStorage.getItem("userUID");
//     setUId(userUID);
//     const userName = await AsyncStorage.getItem("userName");
//     setUserName(userName);
//     const photo = await AsyncStorage.getItem("userPhoto");
//     setUserPhoto(photo);
//     const userEmail = await AsyncStorage.getItem("userEmail");
//     setEmail(userEmail);
     
//     console.log(
//       "Username: " + userName + " Email:" + userEmail + " Photo:" + photo
//     );
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//       <View style={styles.container}>
//         <View style={styles.avatarContainer}>
//           <Image style={styles.avatar} source={
//             userPhoto === './assets/default-avatar.png'
//               ? require('./assets/user1.png')  // Local image
//               : { uri: userPhoto }                      // Remote image
//           } />
//           <TouchableOpacity style={styles.changeAvatarButton}>
//             <Text style={styles.usr_TextHeader}>{userName}</Text>
//             <Text style={styles.usr_TextHeader2}>
//              {email}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.details}>
//           <View style={styles.contentContainer}>
//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flex: 1,
//               }}
//             ></View>

//             <View style={styles.card_style}>
//               <TouchableOpacity>
//                 <Text style={styles.text_style}>
//                   Change Theme: {theme.dark == true ? "Dark" : "Light"}
//                 </Text>

//                 <View style={styles.right_icon}>
//                   {/* <Button title="Change Theme" onPress={toggleTheme} /> */}
//                   <Switch
//                     value={theme.dark}
//                     onValueChange={toggleTheme}
//                     thumbColor="#3f70df"
//                     trackColor={{ false: "#0dc155", true: "#3f70df" }}
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.card_style}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("ChangePasswordScreen")}
//               >
//                 <Text style={styles.text_style}>Change Password</Text>
//                 <FontAwesome
//                   name="key"
//                   style={styles.right_icon}
//                   size={18}
//                   color={Colors.black_text}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.card_style}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("PrivacyPolicy")}
//               >
//                 <Text style={styles.text_style}>Terms of Services</Text>
//                 <FontAwesome
//                   name="google-plus-circle"
//                   style={styles.right_icon}
//                   size={18}
//                   color={Colors.black_text}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.card_style}>
//               <TouchableOpacity onPress={callLogout}>
//                 <Text style={styles.text_style}>Account Logout</Text>
//                 <FontAwesome
//                   name="lock"
//                   style={styles.right_icon}
//                   size={18}
//                   color={Colors.black_text}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// var styles = StyleSheet.create({
//   text: {
//     color: "black",
//   },
//   container: {
//     flex: 1,
//     width: "100%",
//   },
//   details: {
//     flex: 1,
//   },
//   content: {
//     padding: 10,
//   },
//   right_icon: {
//     marginTop: -15,
//     alignItems: "flex-end",
//     justifyContent: "center",
//     textAlign: "right",
//   },

//   footer: {
//     height: 60,
//     padding: 10,
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },

//   sub_title: {
//     margin: 10,
//     height: 60,
//     alignSelf: "stretch",
//     textAlign: "left",
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//   },

//   footer_title: {
//     fontSize: 14,
//     color: "black",
//     fontWeight: "bold",

//     textTransform: "capitalize",
//   },
//   avatarContainer: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   avatar: {
//     backgroundColor: "white",
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   changeAvatarButton: {
//     marginTop: 10,
//   },
//   usr_TextHeader: {
//     color: "grey",
//     fontWeight: "bold",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   usr_TextHeader2: {
//     color: "grey",
//     fontWeight: "bold",
//     fontSize: 14,
//     textAlign: "center",
//   },
//   card_style: {
//     borderColor: "white",
//     borderStartWidth: 1,
//     borderEndWidth: 2,
//     borderTopWidth: 2,
//     borderBottomWidth: 1,
//     backgroundColor: "white",
//     borderRadius: 2,
//     padding: 12,
//     marginLeft: 2,
//     marginRight: 2,
//     marginVertical: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     marginTop: 2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   text_style: {
//     fontSize: 14,
//     paddingTop: 15,
//     fontWeight: "bold",
//     color: "black",
//   },
//   contentContainer: {
//     width: "100%",
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   button: {
//     alignSelf: "center",
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
// });

// export default ProfileScreen;
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Alert,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Animated,  // Import Animated
  Easing,
} from "react-native";
import Colors from "../Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "./theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebaseConfig";
function ProfileScreen({ navigation }) {
  const themeContext = useContext(ThemeContext);
  const [userName, setUserName] = useState("");
  const [uID, setUId] = useState("");
  const [email, setEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState('');

  const photoAnimation = useRef(new Animated.Value(0)).current; // Animation for profile picture
  const buttonAnimation = useRef(new Animated.Value(1)).current; // Animation for button scale

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  const callLogout = async () => {
    auth
    .signOut()
    .then(async () => {
      await AsyncStorage.setItem("userUID", "");
      await AsyncStorage.setItem("userName", "");
      await AsyncStorage.setItem("userPhoto", "");
      await AsyncStorage.setItem("@userLoginData", "");
      await AsyncStorage.setItem("userEmail", "");
      await AsyncStorage.setItem("userPassword", "");
      navigation.navigate("Login");
    })
    .catch(error => alert(error.message))
   
  };

  useEffect(() => {
    fetch_StoredUser();

    // Profile picture animation (fade in and scale up)
    Animated.timing(photoAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetch_StoredUser = async () => {
    const userUID = await AsyncStorage.getItem("userUID");
    setUId(userUID);
    const userName = await AsyncStorage.getItem("userName");
    setUserName(userName);
    const photo = await AsyncStorage.getItem("userPhoto");
    setUserPhoto(photo);
    const userEmail = await AsyncStorage.getItem("userEmail");
    setEmail(userEmail);

    console.log(
      "Username: " + userName + " Email:" + userEmail + " Photo:" + photo
    );
  };

  // Button press animation (scaling down on press)
  const handlePressIn = () => {
    Animated.spring(buttonAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  // Button release animation (scaling back up)
  const handlePressOut = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {/* Animated Profile Picture */}
          <Animated.Image
            style={[
              styles.avatar,
              {
                transform: [
                  {
                    scale: photoAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
                opacity: photoAnimation, // Fade in effect
              },
            ]}
            source={
              userPhoto === './assets/default-avatar.png'
                ? require('./assets/user1.png')  // Local image
                : { uri: userPhoto }                      // Remote image
            }
          />
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.usr_TextHeader}>{userName}</Text>
            <Text style={styles.usr_TextHeader2}>{email}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.contentContainer}>
            <View style={styles.card_style}>
              <TouchableOpacity>
                <Text style={styles.text_style}>
                  Change Theme: {theme.dark == true ? "Dark" : "Light"}
                </Text>

                <View style={styles.right_icon}>
                  <Switch
                    value={theme.dark}
                    onValueChange={toggleTheme}
                    thumbColor="#3f70df"
                    trackColor={{ false: "#0dc155", true: "#3f70df" }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.card_style}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangePasswordScreen")}
              >
                <Text style={styles.text_style}>Change Password</Text>
                <FontAwesome
                  name="key"
                  style={styles.right_icon}
                  size={18}
                  color={Colors.black_text}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.card_style}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                <Text style={styles.text_style}>Terms of Services</Text>
                <FontAwesome
                  name="google-plus-circle"
                  style={styles.right_icon}
                  size={18}
                  color={Colors.black_text}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.card_style}>
              {/* Animated Logout Button */}
              <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={callLogout}
              >
                <Animated.View
                  style={[
                    {
                      transform: [{ scale: buttonAnimation }],
                    },
                  ]}
                >
                  <Text style={styles.text_style}>Account Logout</Text>
                  <FontAwesome
                    name="lock"
                    style={styles.right_icon}
                    size={18}
                    color={Colors.black_text}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  text: {
    color: "black",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  details: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  usr_TextHeader: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  usr_TextHeader2: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  card_style: {
    borderColor: "white",
    borderStartWidth: 1,
    borderEndWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderRadius: 2,
    padding: 12,
    marginLeft: 2,
    marginRight: 2,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    marginTop: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  text_style: {
    fontSize: 14,
    paddingTop: 15,
    fontWeight: "bold",
    color: "black",
  },
  right_icon: {
    marginTop: -15,
    alignItems: "flex-end",
    justifyContent: "center",
    textAlign: "right",
  },
  contentContainer: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ProfileScreen;
