import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { auth, database } from '../../Services/firebase';
import { WP, HP } from '../../theme/PixelResponsive';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState([]);
  const [loadingOlderMessages, setLoadingOlderMessages] = useState(false);

  const currentUserId = auth().currentUser?.uid;

  // Hardcoded UIDs (replace with real ones from Firebase Auth)
  const userA = 'fVENJm0W2RPWg4773xRFsVY5Dxz1';
  const userB = 'Sc4wOTo7O3ZEcerHHnGBW32Uo8v1';

  // Automatically pick chat partner
  const otherUserId = currentUserId === userA ? userB : userA;

  // Generate consistent room ID
  const chatRoomId =
    currentUserId < otherUserId
      ? `${currentUserId}_${otherUserId}`
      : `${otherUserId}_${currentUserId}`;

  // Load recent messages first
  useEffect(() => {
    const chatRef = database().ref(`chatRooms/${chatRoomId}/messages`);

    const onValueChange = chatRef.on('value', snapshot => {
      const msgs = snapshot.val() || {};
      const messagesArray = Object.values(msgs);
      setMessages(messagesArray);
    });

    return () => chatRef.off('value', onValueChange);
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      timestamp: Date.now(),
      senderId: currentUserId,
    };

    const newRef = database().ref(`chatRooms/${chatRoomId}/messages`).push();
    await newRef.set(newMessage);

    setInput('');
  };

  const loadOlderMessages = () => {
    if (loadingOlderMessages) return; // Prevent multiple fetches at once

    setLoadingOlderMessages(true);
    const chatRef = database().ref(`chatRooms/${chatRoomId}/messages`);
    
    chatRef
      .orderByChild('timestamp')
      .endAt(messages[0]?.timestamp)  // Fetch messages older than the first message in the list
      .limitToLast(10)  // Limit the number of older messages loaded
      .once('value', snapshot => {
        const olderMessages = snapshot.val() || {};
        const olderMessagesArray = Object.values(olderMessages);

        // Prepend older messages to the current messages
        setMessages(prevMessages => [...olderMessagesArray, ...prevMessages]);

        setLoadingOlderMessages(false);
      });
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.senderId === currentUserId ? styles.sent : styles.received,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={HP(10)}  
    >
      <Text style={styles.heading}>Let's Chat</Text>

      <FlatList
        data={messages}  // No need to reverse here
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageList}
        onEndReached={loadOlderMessages}  // Load older messages when scrolling up
        onEndReachedThreshold={0.5}  // Trigger when scrolled to 50% from the top
        inverted  // Keep the most recent message at the bottom of the list
        ListFooterComponent={loadingOlderMessages && <Text>Loading...</Text>} // Display a loading text while fetching
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="#B8B8B8" 
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2223',  
  },
  heading: {
    fontSize: HP(4),  
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: HP(2), 
    marginBottom: HP(2),  
  },
  messageList: {
    padding: WP(3), 
  },
  messageBubble: {
    padding: HP(1.5), 
    marginVertical: HP(1), 
    borderRadius: 20,
    maxWidth: '75%',
    backgroundColor: '#FFFFFF',  
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#BA1C35',  
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#725154', 
  },
  messageText: {
    fontSize: HP(2),  
    color: '#FFFFFF', 
  },
  inputContainer: {
    flexDirection: 'row',
    padding: HP(1.5),  
    borderTopWidth: 1,
    borderColor: '#725154', 
    backgroundColor: '#2F2223',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },
  input: {
    flex: 1,
    height: HP(6), 
    backgroundColor: '#593538',  
    paddingHorizontal: WP(3), 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#725154',  
    fontSize: HP(2), 
    color: '#FFFFFF',  
  },
  sendButton: {
    marginLeft: WP(3),  
    backgroundColor: '#BA1C35',  
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(4),  
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  sendText: {
    color: '#FFFFFF',  
    fontWeight: '600',
    fontSize: HP(2),  
  },
});

export default ChatScreen;
