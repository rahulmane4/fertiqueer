// GradientButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
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
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { height:50, marginLeft:20, marginRight:20,
    borderRadius: 25, // Rounded corners
    overflow: 'hidden', // Ensures the gradient doesn't overflow the button
    marginVertical: 10, // Vertical spacing between buttons
  },
  gradient: {
    paddingVertical: 15, // Vertical padding inside the button
    paddingHorizontal: 20, // Horizontal padding inside the button
    alignItems: 'center', // Center the text
    justifyContent: 'center', // Center the text
  },
  text: {
    color: '#FFFFFF', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
});

export default GradientButton;
