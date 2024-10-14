// import { StatusBar } from "expo-status-bar";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,SafeAreaView,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { ThemeContext } from "./theme/ThemeContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const HomeScreen = ({navigation}) => {
//   const themeContext = useContext(ThemeContext);
//   const [userPhoto, setUserPhoto] = useState('');
//   const [userName, setUserName] = useState('');
//   const [uID, setUId] = useState('');
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   if (!themeContext) {
//     return null;
//   }

//   const { theme, toggleTheme } = themeContext;

//   // Dummy data for grid items
//   const data = [
//     { id: "1", title: "Gay Men", image: require('./assets/gaymen.png') },
//     { id: "2", title: "Lesbian", image: require('./assets/lesbian.png') },
//     { id: "3", title: "Trans Male", image: require('./assets/trans_male.png') },
//     {  id: "4", title: "Trans Female",  image: require('./assets/trans_female.png')  },
//     { id: "5", title: "Bisexual", image: require('./assets/bisexual.png') },
//     {  id: "6",    title: "Gender Fluidily",  image: require('./assets/gender_fluidity.png')  },
//   ];
//  useEffect(()=>{
//   fetch_StoredUser();

//  },[])
//  const fetch_StoredUser= async()=> {
//    const userUID= await AsyncStorage.getItem('userUID');
//    setUId(userUID);
//   const userName=await AsyncStorage.getItem('userName');
//   setUserName(userName);
//   const photo=await AsyncStorage.getItem('userPhoto',);
//   setUserPhoto(photo);
//   const userEmail=await AsyncStorage.getItem('userEmail');
//   setEmail(userEmail);
//   const userPassword=await AsyncStorage.getItem('userPassword');
//   setPassword(userPassword);
//   console.log('Username: '+userName+' Email:'+userEmail+' Photo:'+photo);
//  }
//   // const imageMap=(path) => {
//   //   const imgpath='./assets/'+path;
//   //   const fullPath= require("./assets/"+{path});
//   //   return fullPath;
//   // };
//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('CategoryList', { category: item })} >
//       <Image     source={item.image} style={styles.image}
//       />

//       <View style={styles.textOverlay}>
//         <Text style={styles.itemText}>{item.title}</Text>
//       </View>
//     </TouchableOpacity>
//   );
//   // TabView scenes
//   const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
//   );
//   const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>

//     <View style={styles.container}>
//       {/* Profile Section */}
//       <StatusBar />
//       <View style={styles.profileContainer}>
//         <Image
//           style={styles.profileImg}
//           source={
//             userPhoto === './assets/default-avatar.png'
//               ? require('./assets/default-avatar.png')  // Local image
//               : { uri: userPhoto }                      // Remote image
//           }   />
//         <View>
//           <Text style={styles.welcomeLeble}>Welcome back {userName}</Text>

//           <Text style={styles.profileName}>{email}</Text>
//         </View>
//       </View>
//       {/* <GradientButton title="Button" onPress={()=>{}}/> */}
//       <Text style={styles.categoryLabel}>Choose Category</Text>
//       {/* Grid of Images and Titles */}
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         numColumns={2} // 2 items per row
//         contentContainerStyle={styles.grid}
//       />

//     </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   profileContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 5,
//     backgroundColor: "#f5f5f5",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   profileImg: {
//     backgroundColor: "white",
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   welcomeLeble: {
//     fontSize: 14,
//     color: "grey",
//     marginLeft: 10,
//   },
//   categoryLabel: { fontSize: 14, color: "grey", marginTop: 20, marginLeft: 20 },
//   grid: {
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   gridItem: {
//     flex: 1,
//     margin: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     overflow: "hidden", // Ensures text does not go outside the image bounds
//   },
//   image: {
//     width: 180,
//     height: 150,
//     borderRadius: 10,
//   },
//   textOverlay: {
//     position: "absolute", // Allows the text to be placed over the image
//     bottom: 0, // Align the text at the bottom of the image
//     width: "100%",
//     padding: 5, // Padding for text inside the overlay
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   itemText: {
//     color: "#fff", // White text for better visibility on dark background

//     fontSize: 14,
//     textAlign: "center",
//   },
//   tabView: {
//     flex: 1,
//   },
//   scene: {
//     flex: 1,
//   },
// });

// export default HomeScreen;
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ThemeContext } from "./theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const [userPhoto, setUserPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [uID, setUId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  // Dummy data for grid items
  const data = [
    { id: "1", title: "Gay Men", image: require("./assets/gaymen.png") },
    { id: "2", title: "Lesbian", image: require("./assets/lesbian.png") },
    { id: "3", title: "Trans Male", image: require("./assets/trans_male.png") },
    {
      id: "4",
      title: "Trans Female",
      image: require("./assets/trans_female.png"),
    },
    { id: "5", title: "Bisexual", image: require("./assets/bisexual.png") },
    {
      id: "6",
      title: "Gender Fluidily",
      image: require("./assets/gender_fluidity.png"),
    },
  ];

  useEffect(() => {
    fetch_StoredUser();
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
    const userPassword = await AsyncStorage.getItem("userPassword");
    setPassword(userPassword);
    console.log(
      "Username: " + userName + " Email:" + userEmail + " Photo:" + photo
    );
  };

  const renderItem = ({ item, index }) => (
    // Animating each item with a fade-in effect
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 200} // Add delay for staggered loading effect
      style={styles.gridItem}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("CategoryList", { category: item })}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.textOverlay}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImg}
            source={
              userPhoto === "./assets/default-avatar.png"
                ? require("./assets/user1.png")
                : { uri: userPhoto }
            }
          />
          <View>
            <Text style={styles.welcomeLabel}>Welcome Back, {userName}</Text>
            <Text style={styles.profileName}>{email}</Text>
          </View>
        </View>

        <Text style={styles.categoryLabel}>Choose Category</Text>

        {/* Grid of Images and Titles */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2} // 2 items per row
          contentContainerStyle={styles.grid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingBottom: 5,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImg: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  welcomeLabel: {
    fontSize: 14,
    color: "grey",
    marginLeft: 10,
  },
  categoryLabel: { fontSize: 16, color: "grey", marginTop: 20, marginLeft: 20 },
  grid: {
    paddingHorizontal: 2,
    paddingTop: 5,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden", // Ensures text does not go outside the image bounds
  },
  image: {
    width: 180,
    height: 220,
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute", // Allows the text to be placed over the image
    bottom: 0, // Align the text at the bottom of the image
    width: "100%",
    padding: 5, // Padding for text inside the overlay
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "#fff", // White text for better visibility on dark background
    fontSize: 16, fontWeight:'bold',
    textAlign: "center",
  },
});

export default HomeScreen;
