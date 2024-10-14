import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
  return (
    <View style={styles.line} />
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,               // Thickness of the line
    backgroundColor: 'grey', // Color of the line
    width: '100%',            // Full width of the container
    marginVertical: 10,       // Space above and below the line
  },
});

export default HorizontalLine;
