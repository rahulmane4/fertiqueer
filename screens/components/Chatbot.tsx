import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    
    const userMessage = newMessages[0].text;
    fetchResponse(userMessage);
  };

  const fetchResponse = async (userMessage) => {
    try {
      // Replace with your API endpoint or search logic
      //const response = await axios.get(`https://api.example.com/search?q=${userMessage}`);
      
      // Assuming the API returns a response in the following format
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text:"I'm not sure about that.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    } catch (error) {
      console.error(error);
      const errorMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: "Sorry, I couldn't fetch the information.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [errorMessage]));
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your query..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={() => fetchResponse(query)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default Chatbot;
