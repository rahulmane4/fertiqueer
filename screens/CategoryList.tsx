// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import GradientButton from "./theme/GradientButton";

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

// const CategoryList = ({ navigation }) => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const categories = ["All", "Nature", "Mountains", "Beach", "Forest"];

//   // Component for rendering card items
//   const CardItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("Category_SubList", { category: item })
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
//       style={[styles.categoryItem]}
//       onPress={() => setSelectedCategory(item)}
//     >
// {(selectedCategory === item?
//   <LinearGradient
//   colors={[
//     "#3f70df",
//     "#5265d2",
//     "#287cec",
//     "#1394ca",
//     "#0dc155",
//     "#73c43b",
//     "#e8c71e",
//     "#f39e17",
//     "#e6722f",
//     "#df5d3a",
//   ]}
//   start={{ x: 0, y: 0 }}
//   end={{ x: 1, y: 0 }}
//   style={styles.gradient}
// >
//   <Text style={styles.text}>{item}</Text>
// </LinearGradient>
 
//                 :
//       <Text
//         style={[
//           styles.categoryText,
//           selectedCategory === item && styles.selectedCategoryText,
//         ]}
//       >
//         {item}
//       </Text>
// )}
//     </TouchableOpacity>
//   );
//   useEffect(() => {
//     console.log("Component mounted");

//     // Perform side effect (e.g., data fetching)
//   }, []); // Empty array means it runs only on mount

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
//     justifyContent: "flex-start", // Make sure the container starts at the top
//     alignItems: "stretch",
//   },
 
//   gradient: {  height: 30,
//     paddingHorizontal: 10, 
//      borderRadius:3,
//     alignItems: 'center', // Center the text
//     justifyContent: 'center', // Center the text
//   },
//   text: {
//     color: '#FFFFFF', // Text color
//     fontSize: 16, // Font size
//     fontWeight: 'bold', // Bold text
//   },
//   categoriesContainer: {
//     margin: 10,
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   categoryItem: {
//     padding: 5,
//     borderRadius: 5,
//     height: 45,
//     marginRight: 5,
//   },

//   categoryText: {
//     fontSize: 14,
//     backgroundColor: "#ddd", padding:4,
//     paddingHorizontal: 10,borderRadius:3,
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

// export default CategoryList;
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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

const CategoryList = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Nature", "Mountains", "Beach", "Forest"];

  // Component for rendering card items with animation
  const CardItem = ({ item }) => {
    const opacity = useRef(new Animated.Value(0)).current; // Initial opacity 0
    const translateY = useRef(new Animated.Value(50)).current; // Initial translateY 50

    useEffect(() => {
      // Animate opacity and translateY
      Animated.timing(opacity, {
        toValue: 1, // Animate to full opacity
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateY, {
        toValue: 0, // Animate to original position
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Category_SubList", { category: item })
        } // Navigate with category details
      >
        <Animated.View
          style={[
            styles.cardContainer,
            { opacity, transform: [{ translateY }] }, // Apply animation values
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
      style={[styles.categoryItem]}
      onPress={() => setSelectedCategory(item)}
    >
      {selectedCategory === item ? (
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
          style={styles.gradient}
        >
          <Text style={styles.text}>{item}</Text>
        </LinearGradient>
      ) : (
        <Text
          style={[
            styles.categoryText,
            selectedCategory === item && styles.selectedCategoryText,
          ]}
        >
          {item}
        </Text>
      )}
    </TouchableOpacity>
  );

  useEffect(() => {
    console.log("Component mounted");
return()=>{
  console.log(' Cpmponent dismiss');
}
    // Perform side effect (e.g., data fetching)
  }, []); // Empty array means it runs only on mount

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

      {/* Vertical list of cards, filtered by selected category */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  gradient: {
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesContainer: {
    margin: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  categoryItem: {
    padding: 5,
    borderRadius: 5,
    height: 45,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 14, 
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
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
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CategoryList;
