import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/button/CustomButton';
import ActionCard from '../../components/card/ActionCard';
import { WP, HP } from '../../theme/PixelResponsive';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { firebaseApp } from '../../Services/firebase'; 
import { auth } from '../../Services/firebase';
import firestore from '@react-native-firebase/firestore'; 

const { height } = Dimensions.get('window');

const LoginScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // const handleSignUp = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }

  //   const userCredentials = {
  //     firstName,
  //     lastName,
  //     dob,
  //     email,
  //     password,
  //   };

  //   try {
  //     await AsyncStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  //     alert('Sign Up Successful');
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     console.error('Error saving user credentials:', error);
  //   }
  // };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      alert('Please enter a valid phone number');
      return;
    }
  
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      alert('OTP sent. Please check your SMS.');
    } catch (error) {
      console.error('OTP Error:', error);
      alert('Failed to send OTP. Make sure billing is enabled or use test numbers.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    if (!confirm || !otp) {
      alert('Please enter the OTP');
      return;
    }
  
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }
  
    setLoading(true);
    try {
      // 1. Verify OTP
      await confirm.confirm(otp);
  
      // 2. Create Firebase Auth account with email/password
      const trimmedEmail = email.trim().toLowerCase();
      const userCredential = await auth().createUserWithEmailAndPassword(trimmedEmail, password);
      const { uid } = userCredential.user;
  
      // 3. Store user profile in Firestore
      await firestore().collection('users').doc(uid).set({
        uid,
        firstName,
        lastName,
        dob,
        email: trimmedEmail,
        referralCode,
        phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  
      // 4. Store user locally
      await AsyncStorage.setItem(
        'userProfile',
        JSON.stringify({
          uid,
          firstName,
          lastName,
          dob,
          email: trimmedEmail,
          referralCode,
          phoneNumber,
        })
      );
  
      alert('Account created successfully!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Verification/Signup Error:', error);
      alert(error.message || 'An error occurred during sign-up');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />

      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SIGN UP</Text>
        </View>
      </View>

      <ActionCard style={styles.cardStyle}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>Create a new account</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContainer}
        >
          <Text style={styles.label}>FIRST NAME</Text>
          <CustomTextInput
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <Text style={styles.label}>LAST NAME</Text>
          <CustomTextInput
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          <Text style={styles.label}>DATE OF BIRTH</Text>
          <CustomTextInput
            placeholder="Select your date of birth"
            value={dob}
            onChangeText={setDob}
            style={styles.input}
          />

          <Text style={styles.label}>EMAIL</Text>
          <CustomTextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={styles.label}>SET PASSWORD</Text>
          <CustomTextInput
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <CustomTextInput
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.label}>REFERRAL CODE</Text>
          <CustomTextInput
            placeholder="I don't have a referral code"
            value={referralCode}
            onChangeText={setReferralCode}
            style={styles.input}
          />

          <Text style={styles.label}>PHONE NUMBER</Text>
          <CustomTextInput
            placeholder="+1234567890"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <CustomButton
            title="Send OTP"
            onPress={handleSendOTP}
            style={styles.signUpButton}
            textStyle={styles.buttonText}
          />

          {confirm && (
            <>
              <Text style={styles.label}>ENTER OTP</Text>
              <CustomTextInput
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                style={styles.input}
              />
              <CustomButton
                title={loading ? 'Verifying...' : 'Verify & Sign Up'}
                onPress={handleVerifyOTP}
                style={styles.signUpButton}
                textStyle={styles.buttonText}
              />
            </>
          )}

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signIn}>Sign in now</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </ActionCard>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#8B0000',
  },
  headerContainer: {
    paddingTop: HP(5),
    paddingHorizontal: WP(4),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: HP(1),
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardStyle: {
    marginTop: HP(2),
    padding: 0,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingTop: HP(3),
    paddingBottom: HP(2),
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: HP(0.5),
  },
  formContainer: {
    paddingHorizontal: WP(5),
    paddingBottom: HP(4),
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: HP(0.5),
    marginTop: HP(1.5),
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 0,
  },
  signUpButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: HP(1.5),
    marginTop: HP(1),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: HP(2),
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  signIn: {
    color: '#8B0000',
    fontWeight: '600',
  },
});
