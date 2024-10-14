// import React, { useReducer, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";

// const data = [
//   {
//     id: "1",
//     title: "Beautiful Landscape",
//     image: require("./assets/cat_1.png"),
//     category: "Nature",
//   },
//   {
//     id: "2",
//     title: "Serene Mountain",
//     image: require("./assets/cat_2.png"),
//     category: "Mountains",
//   },
//   {
//     id: "3",
//     title: "Calm Beach",
//     image: require("./assets/cat_3.png"),
//     category: "Beach",
//   },
//   {
//     id: "4",
//     title: "Forest Trail",
//     image: require("./assets/cat_1.png"),
//     category: "Forest",
//   },
// ];

// const Category_SubList = ({ route, navigation }) => {
//   const { category } = route.params;
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const categories = ["All", "Nature", "Mountains", "Beach", "Forest"];

//   // Component for rendering card items
//   const CardItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("Category_SubItem_Details", {
//           category: category,
//           sub_category: item,
//         })
//       } // Navigate with category details
//     >
//       <View style={styles.cardContainer}>
//         <Image source={item.image} style={styles.cardImage} />
//         <Text style={styles.cardText}>{item.title}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // Filter data based on selected category
//   const filteredData =
//     selectedCategory === "All"
//       ? data
//       : data.filter((item) => item.category === selectedCategory);

//   // Component for rendering category item
//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.categoryItem,
//         selectedCategory === item && styles.selectedCategory,
//       ]}
//       onPress={() => setSelectedCategory(item)}
//     >
//       <Text
//         style={[
//           styles.categoryText,

//           selectedCategory === item && styles.selectedCategoryText,
//         ]}
//       >
//         {item}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Horizontal list of categories */}
//       <FlatList
//         data={categories}
//         horizontal
//         renderItem={renderCategoryItem}
//         keyExtractor={(item) => item}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.categoriesContainer}
//       />
//       <Text>{category.title}</Text>
//       {/* Vertical list of cards, filtered by selected category */}
//       <FlatList
//         data={filteredData}
//         renderItem={({ item }) => <CardItem item={item} />}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start', // Make sure the container starts at the top
//     alignItems: 'stretch', 
//   },
//   categoriesContainer: {
//     margin: 10,
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   categoryItem: {
//     padding: 5,
//     height: 30,
//     borderRadius: 5,
//     backgroundColor: "#ddd",
//     marginRight: 10,
//   },
//   selectedCategory: {
//     color: "black",
//     height: 30,
//   },
//   categoryText: {
//     fontSize: 16,
//     color: "#000",
//   },
//   selectedCategoryText: {
//     color: "blue",
//     fontWeight: "bold",
//   },
//   cardContainer: {
//     marginVertical: 10,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     overflow: "hidden",
//     elevation: 3, // For Android shadow
//     shadowColor: "#000", // For iOS shadow
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
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

// export default Category_SubList;
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated, // Import Animated from React Native
  Dimensions,
} from "react-native";

const data = [
  {
    id: "1",
    title: "Beautiful Landscape",
    image: require("./assets/cat_1.png"),
    category: "Nature",
  },
  {
    id: "2",
    title: "Serene Mountain",
    image: require("./assets/cat_2.png"),
    category: "Mountains",
  },
  {
    id: "3",
    title: "Calm Beach",
    image: require("./assets/cat_3.png"),
    category: "Beach",
  },
  {
    id: "4",
    title: "Forest Trail",
    image: require("./assets/cat_1.png"),
    category: "Forest",
  },
];

const Category_SubList = ({ route, navigation }) => {
  const { category } = route.params;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Nature", "Mountains", "Beach", "Forest"];

  // Animated Card Item Component
  const CardItem = ({ item }) => {
    const opacity = useRef(new Animated.Value(0)).current; // Initial opacity
    const translateY = useRef(new Animated.Value(50)).current; // Initial Y-axis position

    useEffect(() => {
      // Trigger animations when the component mounts
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1, // Animate to full opacity
          duration: 500, // Duration for opacity animation
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(translateY, {
          toValue: 0, // Move to its final Y position
          duration: 500, // Duration for translation animation
          useNativeDriver: true,
        }),
      ]).start();
      navigation.setOptions({ title: category.title});
    }, []);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Category_SubItem_Details", {
            category: category,
            sub_category: item,
          })
        } // Navigate with category details
      >
        <Animated.View
          style={[
            styles.cardContainer,
            { opacity, transform: [{ translateY }] }, // Apply animated values
          ]}
        >
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.title}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Filter data based on selected category
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  // Component for rendering category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Horizontal list of categories */}
      <FlatList
        data={categories}
        horizontal
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />
      <Text>{category.title}</Text>
      {/* Vertical list of cards, filtered by selected category */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
  },
  categoriesContainer: {
    margin: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  categoryItem: {
    padding: 5,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  selectedCategory: {
    color: "black",
    height: 30,
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
  },
  selectedCategoryText: {
    color: "blue",
    fontWeight: "bold",
  },
  cardContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  cardImage: {
    width: Dimensions.get("window").width - 20, 
    height: 150, 
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Category_SubList;
