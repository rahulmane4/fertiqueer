import React, { useContext, useState } from "react";
import {
  FlatList,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import moment from "moment"; // For time formatting
import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./theme/ThemeContext";
const ChatScreen = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;
  const GradientCircleButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
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
          // colors={['#750787','#004CFF',  '#008000','#FFFF00',  '#FF7A00','#FF0000',]} // Gradient colors (Orange to Red)
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientCircle}
        >
          <Ionicons name="send" size={24} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! How are you?",
      sender: "other",
      senderName: "Bot",
      time: "2024-09-21 10:00",
    },
    {
      id: "2",
      text: "I am good, thanks! How about you?",
      sender: "me",
      senderName: "You",
      time: "2024-09-21 10:02",
    },
    {
      id: "3",
      text: "Doing great! Working on a React Native project.",
      sender: "other",
      senderName: "Bot",
      time: "2024-09-21 10:05",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "me",
        senderName: "You",
        time: moment().format("YYYY-MM-DD HH:mm"),
      };
      setMessages((prevMessages) => [newMessageObject, ...prevMessages]);
      setNewMessage("");
    }
  };

  const renderMessageItem = ({ item }) => {
    const isMe = item.sender === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            styles.senderName,
            isMe ? styles.otherMessageBubble : styles.myMessageBubble,
          ]}
        >
          {item.senderName}
        </Text>
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.otherMessageBubble : styles.myMessageBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        <Text style={styles.timeText}>
          {moment(item.time).format("h:mm A")}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/*     <GradientText
                    text="Three color left to right color gradient title"
                    colors={['orange', 'purple', 'blue']}
                    gradientDirection={{ start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }}  
                    style={styles.title}
                />
 
                <GradientText
                    text="A gradiented paragraph with multiple color stops and top to bottom direction. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis."
                    colors={['orange', 'red', 'darkred', 'navy', 'green']}
                    gradientDirection={{ start: { x: 0, y: 0 }, end: { x: 0, y: 1 } }}  
                    style={styles.paragraph}
                />
                <GradientButton
                    title="Press Me"
                    onPress={() => alert('Button Pressed!')}
                    colors={['#4c669f', '#3b5998', '#192f6a']}  
                />

                <GradientCircleButton onPress={() => alert('Message Sent!')} />
            </View> */}
        {/* Chat Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          inverted
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask your question here"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity> */}
          <GradientCircleButton onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageList: {
    paddingHorizontal: 5,
  },
  messageContainer: {
    marginVertical: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#e0f7fa", // Set the background color for left-side message
    padding: 10,
    marginVertical: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#dcedc8", // Set the background color for right-side message
    padding: 10,
    marginVertical: 5,
    marginRight: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: -10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    color: "yellow",
    alignSelf: "center",
  },
  myMessageBubble: {
    padding: 5,
    borderRadius: 10,
  },
  otherMessageBubble: {
    padding: 5,
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  messageText: {
    color: "black",
  },
  timeText: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",

    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
  },
  sendButton: {
    justifyContent: "center",
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 16,
  },
  buttonContainer: {
    borderRadius: 50, // Ensures the button is circular
    overflow: "hidden",
  },
  gradientCircle: {
    width: 60, // Circle dimensions
    height: 60,
    borderRadius: 30, // Half of width/height for a perfect circle
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
