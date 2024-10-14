import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./theme/ThemeContext";

const GradientCircleButton = ({ text }) => {
  return (
    <View style={styles.buttonContainer}>
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
        style={styles.gradientCircle}
      >
        <Ionicons name={text} size={24} color="#FFFFFF" />
      </LinearGradient>
    </View>
  );
};

const songList = [
  {
    id: "1",
    title: "Autogenic",
    artist: "Relaxation 1",
    description: "A soothing track for meditation.",
    url: require("./assets/meditation_1.mp3"),
    isFavorite: false,
  },
  {
    id: "2",
    title: "Song 2",
    artist: "Artist 2",
    description: "A calming instrumental piece.",
    url: require("./assets/meditation_1.mp3"),
    isFavorite: false,
  },
  {
    id: "3",
    title: "Song 3",
    artist: "Artist 3",
    description: "Perfect background for yoga.",
    url: require("./assets/meditation_1.mp3"),
    isFavorite: false,
  },
];

const Meditation = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [songs, setSongList] = useState(songList);
  const sliderRef = useRef<FlatList>(null);

  const loadSound = async (trackIndex: number) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      songs[trackIndex].url
    );
    setSound(newSound);
    setPosition(0);
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        nextSong();
      }
    }
  };

  const togglePlayPause = async (index) => {
    if (currentTrackIndex !== index) {
      loadSound(index);
    } else {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const toggleFavorite = (id) => {
    const updatedSongs = songs.map((song) =>
      song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
    );
    setSongList(updatedSongs);
  };

  const nextSong = () => {
    let nextTrack = (currentTrackIndex + 1) % songs.length;
    loadSound(nextTrack);
  };

  const previousSong = () => {
    let prevTrack = (currentTrackIndex - 1 + songs.length) % songs.length;
    loadSound(prevTrack);
  };

  useEffect(() => {
    loadSound(currentTrackIndex);
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrackIndex]);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
       
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listArtist}>{item.artist}</Text>
                <Text style={styles.listDescription}>{item.description}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => togglePlayPause(index)}>
                    <GradientCircleButton text={isPlaying && currentTrackIndex === index ? "pause" : "play"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Ionicons
                      name={item.isFavorite ? "heart" : "heart-outline"}
                      size={30}
                      color={item.isFavorite ? "red" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          /> 
        
       
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: { 
    borderRadius: 10,
   width: "100%", backgroundColor: "white",
    marginBottom: 10,padding:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listArtist: {
    fontSize: 16,
    color: "#666",
  },
  listDescription: {
    fontSize: 14,
    color: "#999",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  controlText: {
    fontSize: 16,
    marginHorizontal: 20,
    color: "#CDC1FF",
  },
  controlTime: {
    fontSize: 16,
    color: "#CDC1FF",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  controls: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
  sendButton: {
    marginHorizontal: 15,
  },
  
  gradientCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Meditation;
// import React, { useState, useEffect, useRef, useContext } from "react";
// import {
//   View,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { Audio } from "expo-av";
// import { LinearGradient } from "expo-linear-gradient";
// import Slider from "@react-native-community/slider";
// import { Ionicons } from "@expo/vector-icons";
// import { ThemeContext } from "./theme/ThemeContext";

// const GradientCircleButton = ({ text }) => {
//   return (
//     <View style={styles.buttonContainer}>
//       <LinearGradient
//         colors={[
//           "#3f70df",
//           "#5265d2",
//           "#287cec",
//           "#1394ca",
//           "#0dc155",
//           "#73c43b",
//           "#e8c71e",
//           "#f39e17",
//           "#e6722f",
//           "#df5d3a",
//         ]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.gradientCircle}
//       >
//         <Ionicons name={text} size={24} color="#FFFFFF" />
//       </LinearGradient>
//     </View>
//   );
// };

// const songList = [
//   {
//     id: "1",
//     title: "Autogenic",
//     artist: "Releaxtion 1",
//     url: require("./assets/meditation_1.mp3"),
//     isFavorite: false,
//   },
//   {
//     id: "2",
//     title: "Song 2",
//     artist: "Artist 2",
//     url: require("./assets/meditation_1.mp3"),
//     isFavorite: false,
//   },
//   {
//     id: "3",
//     title: "Song 3",
//     artist: "Artist 3",
//     url: require("./assets/meditation_1.mp3"),
//     isFavorite: false,
//   },
// ];

// const Meditation = () => {
//   const themeContext = useContext(ThemeContext);
//   if (!themeContext) {
//     return null;
//   }

//   const { theme } = themeContext;
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
//   const [position, setPosition] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);
//   const [timer, setTimer] = useState<number>(0); // Timer state
//   const [songs, setSongList] = useState(songList);

//   const sliderRef = useRef<FlatList>(null);

//   const loadSound = async (trackIndex: number) => {
//     if (sound) {
//       await sound.unloadAsync();
//     }

//     const { sound: newSound } = await Audio.Sound.createAsync(
//       songs[trackIndex].url
//     );
//     setSound(newSound);
//     setPosition(0);
//     setCurrentTrackIndex(trackIndex);
//     setIsPlaying(true);

//     // Add a status update listener
//     newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
//     const status = await newSound.getStatusAsync();

//     await newSound.playAsync();
//   };

//   const onPlaybackStatusUpdate = (status) => {
//     if (status.isLoaded) {
//       setPosition(status.positionMillis);
//       setDuration(status.durationMillis || 0); // Update duration
//       if (status.didJustFinish) {
//         nextSong(); // Automatically go to the next song when the current one finishes
//       }
//     }
//   };

//   const togglePlayPause = async () => {
//     if (sound) {
//       if (isPlaying) {
//         await sound.pauseAsync();
//       } else {
//         await sound.playAsync();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleSeek = async (value: number) => {
//     if (sound) {
//       await sound.setPositionAsync(value);
//       setPosition(value);
//     }
//   };
//   const toggleFavorite = (id) => {
//     const updatedSongs = songs.map((song) =>
//       song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
//     );
//     setSongList(updatedSongs);
//   };
//   const nextSong = () => {
//     let nextTrack = (currentTrackIndex + 1) % songs.length;
//     loadSound(nextTrack);
//     sliderRef.current?.scrollToIndex({ index: nextTrack });
//   };

//   const previousSong = () => {
//     let prevTrack = (currentTrackIndex - 1 + songs.length) % songs.length;
//     loadSound(prevTrack);
//     sliderRef.current?.scrollToIndex({ index: prevTrack });
//   };

//   useEffect(() => {
//     loadSound(currentTrackIndex);
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [currentTrackIndex]);


//   // Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (isPlaying) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1000); // Increment timer by 1000 ms
//       }, 1000);
//     } else if (interval) {
//       clearInterval(interval); // Clear interval when not playing
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval); // Clear interval on cleanup
//       }
//     };
//   }, [isPlaying]);
//   const formatTime = (millis: number) => {
//     const minutes = Math.floor(millis / 60000);
//     const seconds = Math.floor((millis % 60000) / 1000);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//       <View style={styles.container}>
//         <ImageBackground
//           source={require("./assets/meditation_bg.png")} // Your image path
//           style={styles.background}
//           resizeMode="cover" // Adjust this according to your design needs
//         >
//           <FlatList
//             ref={sliderRef}
//             data={songs}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => (
//               <View style={styles.listContainer}>
//                 <Text style={styles.listTxt}>{item.title}</Text>
//                 <Text style={styles.listTxt}>{item.artist}</Text>
//                 <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleFavorite(item.id)}>
//                   <Ionicons
//                     name={item.isFavorite ? "heart" : "heart-outline"}
//                     size={60}
//                     color={item.isFavorite ? "red" : "gray"}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//             scrollEnabled={false}
//           />
//         </ImageBackground>
//         <Ionicons
//                     name={ "heart"}
//                     size={60}
//                     color={"red"}
//                   />
//         <View style={styles.timeContainer}>
//           <Text style={styles.controlTime}> {formatTime(position)}</Text>
//           <Text style={styles.controlTime}>{formatTime(duration)}</Text>
//         </View>

//         <Slider
//           style={styles.slider}
//           value={position}
//           minimumValue={0}
//           maximumValue={duration}
//           onSlidingComplete={handleSeek}
//           minimumTrackTintColor="#A594F9"
//           maximumTrackTintColor="#ccc"
//           thumbTintColor="#CDC1FF"
//         />

//         <View style={styles.controls}>
//           <TouchableOpacity onPress={previousSong}>
//             <Text style={styles.controlText}>Prev</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={togglePlayPause} style={styles.sendButton}>
//             {isPlaying ? (
//               <GradientCircleButton text="pause" />
//             ) : (
//               <GradientCircleButton text="play" />
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity onPress={nextSong}>
//             <Text style={styles.controlText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   controls: {
//     flexDirection: "row",
//     marginVertical: 20,
//     marginBottom: 70,
//   },
//   sendButton: {
//     justifyContent: "center",
//     paddingHorizontal: 15,
//     marginLeft: 10,
//     borderRadius: 25,marginTop:-30,
//   },
//   controlText: {
//     fontSize: 16,
//     marginHorizontal: 20, fontWeight:'bold',
//     color: "#CDC1FF",
//   },
//   controlTime: {
//     fontSize: 16,
//     color: "#CDC1FF",
//   },
//   slider: {
//     width: "90%",
//     height: 40,
//   },
//   timeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//   },
//   favoriteIcon:{
//     marginTop:10,
//   },
//   buttonContainer: {
//     borderRadius: 50,
//     overflow: "hidden",
//   },
//   background: {
//     height: 450,
//     flex: 1, // Ensures the background covers the entire view
//     justifyContent: "center", // Centers the content vertically
//     alignItems: "center", // Centers the content horizontally
//   },
//   gradientCircle: {
//     width: 70,
//     height: 70, 
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listContainer: {
//     width: 250,
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listTxt: {
//     justifyContent: "center",
//     fontSize: 16,
//     lineHeight: 20,
//     marginTop: -50,
//   },
// });

// export default Meditation;
