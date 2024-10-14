import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Audio } from "expo-av";

const soundList = [
  { id: "1", title: "Sound 1", uri: require("./assets/meditation_1.mp3") },
  { id: "2", title: "Sound 2", uri: require("./assets/meditation_2.mp3") },
  { id: "3", title: "Sound 3", uri: require("./assets/meditation_3.mp3") },
];

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(uri);
    setIsPlaying(true);
       setSound(sound);
      console.log('playSound Play  '+uri)
      await sound.playAsync();
    
  };
  const stopSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(uri);
    if (sound) {
      await sound.stopAsync(); // Stop the sound
      setIsPlaying(false);
      console.log('stopSound Stop  '+uri )
    }
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => playSound(item.uri)} style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      {isPlaying? <Button
        title={isPlaying ? 'Stop Sound' : 'Play Sound'}
        onPress={() => stopSound(item.uri)}
      />
      :<Button
        title={isPlaying ? 'Play Sound' : 'Play Sound'}
        onPress={() => playSound(item.uri)}
      /> }
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={soundList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
});
