// notifications.js
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert, Platform } from 'react-native';

export async function initFCM() {
  try {
    // 1️⃣ Request permissions
    const status = await messaging().requestPermission();
    const enabled =
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      Alert.alert('Notification permission denied');
      return;
    }

    // 2️⃣ Get FCM token
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);

    // 3️⃣ Save FCM token to Firestore under the logged-in user
    const uid = auth().currentUser?.uid;
    if (uid && fcmToken) {
      await firestore().collection('users').doc(uid).set(
        { fcmToken },
        { merge: true }
      );
    }

    // 4️⃣ Listen for token refresh
    messaging().onTokenRefresh(async (newToken) => {
      console.log('New FCM Token:', newToken);
      if (uid) {
        await firestore().collection('users').doc(uid).set(
          { fcmToken: newToken },
          { merge: true }
        );
      }
    });
  } catch (error) {
    console.error('FCM initialization error:', error);
  }
}
