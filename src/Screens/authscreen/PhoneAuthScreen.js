import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { WP, HP } from '../../theme/PixelResponsive';

const PhoneAuthScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithPhoneNumber = async () => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert('Verification code sent', 'Please check your phone');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message || 'Phone auth failed');
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    if (!confirm) return;

    setLoading(true);
    try {
      await confirm.confirm(code);
      Alert.alert('Success', 'Phone authenticated');
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Authentication</Text>

      {!confirm ? (
        <>
          <TextInput
            placeholder="+1234567890"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={signInWithPhoneNumber}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Code</Text>}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={confirmCode}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WP(5),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: HP(4),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: HP(1.5),
    borderRadius: 8,
    marginBottom: HP(2),
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: HP(1.8),
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhoneAuthScreen;
