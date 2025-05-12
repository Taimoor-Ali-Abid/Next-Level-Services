import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Router/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { initFCM } from './src/Services/notifications'; // wherever you put your initFCM function
import { Alert } from 'react-native';
export default function App() {
  useEffect(() => {
    // Initialize FCM after user logs in
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      if (user) {
        initFCM(); // Sets up token and Firestore
      }
    });

    // Foreground notifications
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.notification) {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body
        );
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessage();
    };
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
