import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

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
    url: require("./assets/meditation_2.mp3"),
    isFavorite: false,
  },
  {
    id: "3",
    title: "Song 3",
    artist: "Artist 3",
    description: "Perfect background for yoga.",
    url: require("./assets/meditation_3.mp3"),
    isFavorite: false,
  },
];

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
        <Ionicons name={text} size={32} color="#FFFFFF" />
      </LinearGradient>
    </View>
  );
};

const Meditation = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongList] = useState(songList);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const sliderRef = useRef<FlatList>(null);

  const loadSound = async (trackIndex: number) => {
    setIsPlaying(true);
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      songs[trackIndex].url
    );
    setSound(newSound);
    setPosition(0);
    setCurrentTrackIndex(trackIndex);

console.log('Rahul')
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    
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
    console.log("togglePlayPause"+index+" isPlaying"+isPlaying)
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
    sliderRef.current?.scrollToIndex({ index: nextTrack });
  };

  const previousSong = () => {
    let prevTrack = (currentTrackIndex - 1 + songs.length) % songs.length;
    loadSound(prevTrack);
    sliderRef.current?.scrollToIndex({ index: prevTrack });
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
      setSound(null);
      setPosition(0);
    }
  };

  useEffect(() => {
    loadSound(currentTrackIndex);
    return () => {
      stopPlayback(); // Ensure the sound stops when the component is dismissed
    };
  }, [currentTrackIndex]);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditation</Text>
      </View>
      <FlatList
        ref={sliderRef}
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.listContainer}>
            {/* Carousel / Slider */}
            <View style={styles.carousel}>
              <Image
                source={require("./assets/meditation_bg.png")} // Replace with your image URL
                style={styles.coverImage}
              />
            </View>

            <View style={styles.titleSection}>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Ionicons
                  name={item.isFavorite ? "heart" : "heart-outline"}
                  size={30}
                  color={item.isFavorite ? "red" : "gray"}
                />
              </TouchableOpacity>
              <Text style={styles.musicTitle}>{item.title}</Text>
              <Text style={styles.musicSubTitle}>{item.artist}</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarSection}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                value={position}
                maximumValue={duration}
                onSlidingComplete={handleSeek}
                minimumTrackTintColor="#8E44AD"
                maximumTrackTintColor="#C8C8C8"
                thumbTintColor="#8E44AD"
              />
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Playback Controls */}
            <View style={styles.controls}>
              <TouchableOpacity onPress={previousSong}>
                <Feather name="skip-back" size={32} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => togglePlayPause(index)}
                style={styles.playButton}
              >
                {isPlaying ? (
                  
                  <GradientCircleButton text="pause" /> 
                
                ) : (
                  <GradientCircleButton text="play" />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={nextSong}>
                <Feather name="skip-forward" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        horizontal={true} // Set horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the scrollbar
      />
    </View>
  );
};

 


// import React, { useState,useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   TouchableOpacityComponent,
// } from "react-native";
// import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { LinearGradient } from "expo-linear-gradient";
// import { Audio } from "expo-av"; 
// const songList = [
//   {
//     id: "1",
//     title: "Autogenic",
//     artist: "Relaxation 1",
//     description: "A soothing track for meditation.",
//     url: require("./assets/meditation_1.mp3"),
//     isFavorite: false,
//   },
//   {
//     id: "2",
//     title: "Song 2",
//     artist: "Artist 2",
//     description: "A calming instrumental piece.",
//     url: require("./assets/meditation_1.mp3"),
//     isFavorite: false,
//   },
//   {
//     id: "3",
//     title: "Song 3",
//     artist: "Artist 3",
//     description: "Perfect background for yoga.",
//     url: require("./assets/meditation_1.mp3"),
//     isFavorite: false,
//   },
// ];

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
//         <Ionicons name={text} size={32} color="#FFFFFF" />
//       </LinearGradient>
//     </View>
//   );
// };

// const Meditation = () => {
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [songs, setSongList] = useState(songList);
//   const [position, setPosition] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
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
// console.log('Song Playing '+trackIndex);
//     newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
//     await newSound.playAsync();
//   };

//   const onPlaybackStatusUpdate = (status) => {
//     if (status.isLoaded) {
//       setPosition(status.positionMillis);
//       setDuration(status.durationMillis || 0);
//       if (status.didJustFinish) {
//         nextSong();
//       }
//     }
//   };

//   const togglePlayPause = async (index) => {
//     if (currentTrackIndex !== index) {
//       loadSound(index);
//     } else {
//       if (sound) {
//         if (isPlaying) {
//           await sound.pauseAsync();
//           console.log('Song Pause '+sound);
//         } else {
//           await sound.playAsync();
//           console.log('Song Playing '+sound);
//         }
//         setIsPlaying(!isPlaying);
//       }
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
//       console.log('Meditation COmponent dismiss');
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
    
//   }, [currentTrackIndex]);

//   const formatTime = (millis: number) => {
//     const minutes = Math.floor(millis / 60000);
//     const seconds = Math.floor((millis % 60000) / 1000);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <AntDesign name="arrowleft" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Meditation</Text>
//       </View>
//       <FlatList    ref={sliderRef}
//         data={songs}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <View style={styles.listContainer}>
//             {/* Carousel / Slider */}
//             <View style={styles.carousel}>
//               <Image
//                 source={require("./assets/meditation_bg.png")} // Replace with your image URL
//                 style={styles.coverImage}
//               />
//             </View>

//             <View style={styles.titleSection}>
//               <TouchableOpacity
//                 style={styles.heartButton}
//                 onPress={() => toggleFavorite(item.id)}
//               >
//                 <Ionicons
//                   name={item.isFavorite ? "heart" : "heart-outline"}
//                   size={30}
//                   color={item.isFavorite ? "red" : "gray"}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.musicTitle}>{item.title}</Text>
//               <Text style={styles.musicSubTitle}>{item.artist}</Text>
//             </View>

//             {/* Progress Bar */}
//             <View style={styles.progressBarSection}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 value={position}
//                 maximumValue={duration}
//                 onSlidingComplete={handleSeek}
//                 minimumTrackTintColor="#8E44AD"
//                 maximumTrackTintColor="#C8C8C8"
//                 thumbTintColor="#8E44AD"
//               />
//               <View style={styles.timeContainer}>
//                 <Text style={styles.timeText}>{formatTime(position)}</Text>
//                 <Text style={styles.timeText}>{formatTime(duration)}</Text>
//               </View>
//             </View>

//             {/* Playback Controls */}
//             <View style={styles.controls}>
//               <TouchableOpacity onPress={previousSong}>
//                 <Feather name="skip-back" size={32} color="black" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={togglePlayPause}
//                 style={styles.playButton}
//               >
//                 {isPlaying ? (
//                   <GradientCircleButton text="pause" />
//                 ) : (
//                   <GradientCircleButton text="play" />
//                 )}
//               </TouchableOpacity>

//               <TouchableOpacity onPress={nextSong}>
//                 <Feather name="skip-forward" size={32} color="black" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         horizontal={true} // Set horizontal scrolling
//         showsHorizontalScrollIndicator={false} // Hide the scrollbar
//       />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    alignContent: "flex-start",
    fontWeight: "bold",
    marginStart: 15,
  },
  carousel: {
    alignItems: "center",
    marginTop: 30,
  },
  coverImage: {
    width: 300,
    height: 350,
    borderRadius: 20,
  },
  titleSection: {
    alignItems: "center",
    marginTop: 20,
  },
  musicTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  musicSubTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  listContainer: {
    borderRadius: 10,
    width: 350,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
  },
  heartButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    marginTop: -55,
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  progressBarSection: {
    marginTop: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 14,
    color: "#8E44AD",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 50,
  },
  playButton: {
    padding: 1,
    margin: 5,
    borderRadius: 50,
  },
  playButtonContainer: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gradientCircle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

 export default Meditation;
