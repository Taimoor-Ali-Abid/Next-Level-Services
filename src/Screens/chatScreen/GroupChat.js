// screens/GroupChatScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { auth, database } from '../../Services/firebase';
import { useNavigation } from '@react-navigation/native';

const GroupChatScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigation = useNavigation();

  // Create a new group
  const createGroup = () => {
    if (!groupName.trim()) return;
    setLoading(true);

    const newRef = database().ref('groups').push();
    const groupId = newRef.key;
    const groupData = {
      groupName,
      members: {},   // start with empty map
      admins: { [auth().currentUser.uid]: true }
    };

    newRef
      .set(groupData)
      .then(() => {
        setLoading(false);
        setGroupName('');
      })
      .catch(err => {
        console.error('Error creating group:', err);
        setLoading(false);
      });
  };

  // Fetch all groups
  useEffect(() => {
    const refGroups = database().ref('groups');
    const listener = refGroups.on('value', snap => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, grp]) => ({
        id,
        ...grp
      }));
      setGroups(list);
    });
    return () => refGroups.off('value', listener);
  }, []);

  // When tapping a group: add current user as member & navigate
  const handleGroupPress = grp => {
    const uid = auth().currentUser.uid;
    const name =
      auth().currentUser.displayName ||
      auth().currentUser.email.split('@')[0];

    database()
      .ref(`groups/${grp.id}/members/${uid}`)
      .set({ name, joinedAt: Date.now() })
      .then(() => {
        setSelectedGroup(grp.id);
        navigation.navigate('GroupChatRoom', {
          groupId: grp.id,
          groupName: grp.groupName
        });
      })
      .catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Group Chats</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        placeholderTextColor="#9B111E"
        value={groupName}
        onChangeText={setGroupName}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={createGroup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating…' : 'Create Group'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.groupCard,
              selectedGroup === item.id && styles.selectedGroup
            ]}
            onPress={() => handleGroupPress(item)}
          >
            <View>
              <Text style={styles.groupName}>{item.groupName}</Text>
              <Text style={styles.members}>
                Members: {item.members ? Object.keys(item.members).length : 0}
              </Text>
            </View>
            <Text style={styles.plusSign}>
              {selectedGroup === item.id ? '✔' : '+'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2223',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#660000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#800000',
    fontSize: 16
  },
  createButton: {
    backgroundColor: '#9B111E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#660000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15
  },
  selectedGroup: {
    backgroundColor: '#D3D3D3'
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000'
  },
  members: {
    fontSize: 14,
    color: '#FF0000',
    marginTop: 4
  },
  plusSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800000'
  }
});

export default GroupChatScreen;
