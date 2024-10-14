// PasswordInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // Import the icons from vector-icons

const PasswordInput = () => {
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={isSecure}
      />
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
        <MaterialIcons
          name={isSecure ? 'visibility-off' : 'visibility'}
          size={24}
          color="grey"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 5,
  },
});

export default PasswordInput;
