// 🔄 GroupChatRoom.js (Updated with Emoji Reactions)

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { auth, database } from '../../Services/firebase';

const PAGE_SIZE = 20;
const EMOJI_REACTIONS = ['❤️', '😂', '😮'];

const GroupChatRoom = ({ route, navigation }) => {
  const { groupId, groupName } = route?.params || {};
  if (!groupId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No group selected.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const user = auth().currentUser;
  const uid = user.uid;
  const displayName = user.displayName || user.email.split('@')[0];

  const [messages, setMessages] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [input, setInput] = useState('');
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [longPressedMessage, setLongPressedMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [showEmojiPickerFor, setShowEmojiPickerFor] = useState(null);

  const typingTimeout = useRef(null);
  const typingRef = database().ref(`groups/${groupId}/typing/${uid}`);

  useEffect(() => {
    const ref = database().ref(`users/${uid}/blockedUsers`);
    const listener = ref.on('value', snap => {
      const data = snap.val() || {};
      setBlockedUsers(Object.keys(data));
    });
    return () => ref.off('value', listener);
  }, [uid]);

  const fetchMessages = async (beforeTimestamp = null) => {
    let ref = database().ref(`groups/${groupId}/messages`).orderByChild('timestamp');
    if (beforeTimestamp) ref = ref.endAt(beforeTimestamp - 1);
    const snap = await ref.limitToLast(PAGE_SIZE).once('value');
    const data = snap.val() || {};
    return Object.entries(data)
      .map(([id, msg]) => ({ id, ...msg, readAt: msg.readAt || {} }))
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const loadInitialMessages = async () => {
    const initial = await fetchMessages();
    const filtered = initial.filter(m => !blockedUsers.includes(m.senderId));
    setMessages(filtered);
    if (filtered.length) setLastTimestamp(filtered[0].timestamp);
    markAsRead(filtered);
  };

  const loadOlderMessages = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const older = await fetchMessages(lastTimestamp);
    const filtered = older.filter(m => !blockedUsers.includes(m.senderId));
    if (!filtered.length) setHasMore(false);
    else {
      setMessages(prev => [...filtered, ...prev]);
      setLastTimestamp(filtered[0].timestamp);
      markAsRead(filtered);
    }
    setLoadingMore(false);
  };

  const markAsRead = msgs => {
    msgs.forEach(msg => {
      if (msg.senderId !== uid && !msg.readAt[uid]) {
        database()
          .ref(`groups/${groupId}/messages/${msg.id}/readAt/${uid}`)
          .set(Date.now());
      }
    });
  };

  const blockUser = async () => {
    const blockedId = longPressedMessage.senderId;
    await database().ref(`users/${uid}/blockedUsers/${blockedId}`).set(true);
    const snap = await database().ref(`groups/${groupId}/messages`).once('value');
    const data = snap.val() || {};
    await Promise.all(
      Object.entries(data)
        .filter(([, msg]) => msg.senderId === blockedId)
        .map(([id]) =>
          database().ref(`groups/${groupId}/messages/${id}`).remove()
        )
    );
    setMessages(prev => prev.filter(m => m.senderId !== blockedId));
    Alert.alert('User Blocked', `You have blocked ${longPressedMessage.senderName}`);
    setLongPressedMessage(null);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (editingMessage) {
      const updatedText = input.trim();
      await database()
        .ref(`groups/${groupId}/messages/${editingMessage.id}`)
        .update({ text: updatedText, timestamp: Date.now() });
      setMessages(prev =>
        prev.map(m =>
          m.id === editingMessage.id ? { ...m, text: updatedText } : m
        )
      );
      setEditingMessage(null);
    } else {
      const newRef = database().ref(`groups/${groupId}/messages`).push();
      await newRef.set({
        text: input.trim(),
        timestamp: Date.now(),
        senderId: uid,
        senderName: displayName,
        readAt: { [uid]: Date.now() },
        reactions: {},
      });
    }
    setInput('');
    typingRef.remove();
  };

  const deleteMessage = async msg => {
    await database().ref(`groups/${groupId}/messages/${msg.id}`).remove();
    setMessages(prev => prev.filter(m => m.id !== msg.id));
    setLongPressedMessage(null);
  };

  const handleTyping = text => {
    setInput(text);
    typingRef.set({ displayName, isTyping: true });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => typingRef.remove(), 2000);
  };

  useEffect(() => {
    const listener = database()
      .ref(`groups/${groupId}/typing`)
      .on('value', snap => {
        const data = snap.val() || {};
        delete data[uid];
        setTypingUsers(data);
      });
    return () => {
      database().ref(`groups/${groupId}/typing`).off('value', listener);
      typingRef.remove();
    };
  }, [groupId]);

  useEffect(() => {
    loadInitialMessages();
    const messagesRef = database()
      .ref(`groups/${groupId}/messages`)
      .orderByChild('timestamp');

    const onChildAdded = messagesRef.limitToLast(1).on('child_added', snap => {
      const newMsg = { id: snap.key, ...snap.val() };
      if (blockedUsers.includes(newMsg.senderId)) return;
      setMessages(prev => {
        if (prev.some(m => m.id === newMsg.id)) return prev;
        markAsRead([newMsg]);
        return [...prev, newMsg];
      });
    });

    const onChildChanged = messagesRef.on('child_changed', snap => {
      const updatedMsg = { id: snap.key, ...snap.val() };
      if (blockedUsers.includes(updatedMsg.senderId)) {
        setMessages(prev => prev.filter(m => m.id !== updatedMsg.id));
      } else {
        setMessages(prev =>
          prev.map(m => (m.id === updatedMsg.id ? updatedMsg : m))
        );
      }
    });

    return () => {
      messagesRef.off('child_added', onChildAdded);
      messagesRef.off('child_changed', onChildChanged);
    };
  }, [groupId, blockedUsers]);

  const editMessage = msg => {
    setInput(msg.text);
    setEditingMessage(msg);
    setLongPressedMessage(null);
  };

  const reactToMessage = async (msgId, emoji) => {
    await database()
      .ref(`groups/${groupId}/messages/${msgId}/reactions/${uid}`)
      .set(emoji);
    setShowEmojiPickerFor(null);
    setLongPressedMessage(null);
  };

  const renderItem = ({ item }) => {
    const isMe = item.senderId === uid;
    const seenByOthers = isMe && Object.keys(item.readAt || {}).some(k => k !== uid);
    const reactions = item.reactions ? Object.values(item.reactions) : [];

    return (
      <TouchableOpacity
        onLongPress={() => setLongPressedMessage(item)}
        style={[styles.bubble, isMe ? styles.bubbleSent : styles.bubbleReceived]}
      >
        {!isMe && <Text style={styles.sender}>{item.senderName}</Text>}
        <Text style={styles.text}>{item.text}</Text>
        {reactions.length > 0 && (
          <Text style={styles.reactionText}>{reactions.join(' ')}</Text>
        )}
        {isMe && <Text style={styles.readReceipt}>{seenByOthers ? 'Seen' : ''}</Text>}

        {longPressedMessage?.id === item.id && (
          <View style={styles.longPressMenu}>
            {isMe ? (
              <>
                <TouchableOpacity onPress={() => editMessage(item)} style={styles.menuButton}>
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteMessage(item)} style={styles.menuButton}>
                  <Text style={styles.menuText}>Delete</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={blockUser} style={styles.menuButton}>
                <Text style={styles.menuText}>Block</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => setShowEmojiPickerFor(item.id)}
              style={styles.menuButton}
            >
              <Text style={styles.menuText}>React</Text>
            </TouchableOpacity>
          </View>
        )}

        {showEmojiPickerFor === item.id && (
          <View style={styles.reactionPicker}>
            {EMOJI_REACTIONS.map(emoji => (
              <TouchableOpacity
                key={emoji}
                onPress={() => reactToMessage(item.id, emoji)}
                style={styles.reactionButton}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Text style={styles.header}>{groupName}</Text>

      <FlatList
        data={[...messages].reverse()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        inverted
        onEndReached={loadOlderMessages}
        onEndReachedThreshold={0.2}
      />

      {Object.values(typingUsers).length > 0 && (
        <Text style={styles.typingText}>
          {Object.values(typingUsers).map(u => u.displayName).join(', ')}{' '}
          {Object.values(typingUsers).length > 1 ? 'are typing…' : 'is typing…'}
        </Text>
      )}

      <View style={styles.footer}>
        {editingMessage && (
          <Text style={{ color: '#CCC', paddingHorizontal: 12, marginBottom: 4 }}>
            Editing message…
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Type a message…"
          placeholderTextColor="#B8B8B8"
          value={input}
          onChangeText={handleTyping}
        />
        <TouchableOpacity style={styles.send} onPress={sendMessage}>
          <Text style={styles.sendText}>{editingMessage ? 'Update' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2F2223' },
  header: {
    padding: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#800000',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#660000',
  },
  list: { padding: 12 },
  bubble: {
    maxWidth: '75%',
    borderRadius: 20,
    padding: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bubbleSent: { backgroundColor: '#BA1C35', alignSelf: 'flex-end' },
  bubbleReceived: { backgroundColor: '#725154', alignSelf: 'flex-start' },
  sender: { fontSize: 12, color: '#FFFFFF', marginBottom: 4 },
  text: { fontSize: 16, color: '#FFFFFF' },
  reactionText: {
    fontSize: 18,
    marginTop: 4,
  },
  readReceipt: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
    textAlign: 'right',
    opacity: 0.7,
  },
  longPressMenu: {
    position: 'absolute',
    top: -60,
    left: 10,
    backgroundColor: '#660000',
    borderRadius: 8,
    padding: 8,
    zIndex: 999,
    elevation: 10,
  },
  menuButton: { paddingVertical: 6 },
  menuText: { color: '#FFFFFF', fontSize: 14 },
  reactionPicker: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'flex-start',
  },
  reactionButton: {
    marginRight: 8,
    padding: 4,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  emoji: {
    fontSize: 20,
  },
  typingText: {
    color: '#CCCCCC',
    fontStyle: 'italic',
    paddingLeft: 16,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#660000',
    backgroundColor: '#2F2223',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#593538',
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#725154',
    color: '#FFFFFF',
    fontSize: 16,
  },
  send: {
    marginLeft: 8,
    backgroundColor: '#BA1C35',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2223',
    padding: 20,
  },
  errorText: { color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginBottom: 20 },
  backButton: { backgroundColor: '#9B111E', padding: 12, borderRadius: 8 },
  backText: { color: '#FFFFFF', fontSize: 16 },
});

export default GroupChatRoom;
