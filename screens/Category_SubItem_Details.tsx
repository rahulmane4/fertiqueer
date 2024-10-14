// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";

// const Category_SubItem_Details = ({ route, navigation }) => {
//   const { category } = route.params.category;
//   const { sub_category } = route.params.sub_category;

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
//         <Image
//           source={require("./assets/cat_1.png")}
//           style={styles.cardImage}
//         />
//         <Text style={styles.cardText}>Category and Sub Category Details</Text>
//         <Text style={styles.cardText}>{category}</Text>
//         <Text style={styles.cardText}> {sub_category}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//   },

//   categoryText: {
//     fontSize: 16,
//     color: "#000",
//   },

//   cardContainer: {
//     marginVertical: 10,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     overflow: "hidden",
//     elevation: 3, // For Android shadow
//     shadowColor: "#000", // For iOS shadow
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   cardImage: {
//     width: Dimensions.get("window").width - 20, // Full width minus padding
//     height: 150, // Fixed height
//   },
//   cardText: {
//     padding: 10,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default Category_SubItem_Details;
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated, // Import Animated from React Native
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const Category_SubItem_Details = ({ route }) => {
  const { category } = route.params.category;
  const { sub_category } = route.params.sub_category;

  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity
  const scale = useRef(new Animated.Value(0.8)).current; // Initial scale

  useEffect(() => {
    // Trigger animations when the component mounts
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // Animate to full opacity
        duration: 500, // Animation duration
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.spring(scale, {
        toValue: 1, // Animate to normal scale
        friction: 5, // Smooth bouncing effect
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated View wrapping the card container */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: opacity, // Apply animated opacity
            transform: [{ scale: scale }], // Apply animated scale
          },
        ]}
      >
        <Image
          source={require("./assets/cat_1.png")}
          style={styles.cardImage}
        />
        <Text style={styles.cardText}>Category and Sub Category Details</Text>
        <Text style={styles.cardText}>{category}</Text>
        <Text style={styles.cardText}>{sub_category}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },

  categoryText: {
    fontSize: 16,
    color: "#000",
  },

  cardContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardImage: {
    width: Dimensions.get("window").width - 20, // Full width minus padding
    height: 150, // Fixed height
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Category_SubItem_Details;
