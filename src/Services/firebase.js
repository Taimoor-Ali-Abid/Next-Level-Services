// services/firebase.js
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '822058218454-lqus7bvudtoenuo63rb56qcsktt87veo.apps.googleusercontent.com',
  offlineAccess: false,
});

export { auth, database, GoogleSignin };
