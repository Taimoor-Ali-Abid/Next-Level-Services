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
import { auth } from '../../Services/firebase'; // Firebase auth instance

const { height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      // Sign up user
      await auth().createUserWithEmailAndPassword(email.trim().toLowerCase(), password);
      alert('Sign up successful!');
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen after successful signup
    } catch (error) {
      console.error('Signup Error:', error);
      alert(error.message || 'Error during sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      // Verify user login
      await auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password);
      alert('Login successful!');
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen after successful login
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.message || 'Error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />

      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SIGN UP / LOGIN</Text>
        </View>
      </View>

      <ActionCard style={styles.cardStyle}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>Create your account or login</Text>
        </View>

        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <CustomTextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <CustomTextInput
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {confirmPassword && (
            <>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <CustomTextInput
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
              />
            </>
          )}

          <CustomButton
            title={loading ? 'Processing...' : confirmPassword ? 'Sign Up' : 'Log In'}
            onPress={confirmPassword ? handleSignUp : handleLogin}
            style={styles.signUpButton}
            textStyle={styles.buttonText}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {confirmPassword ? 'Already have an account?' : 'Don’t have an account?'}{' '}
              <TouchableOpacity onPress={() => navigation.navigate(confirmPassword ? 'Login' : 'SignUp')}>
                <Text style={styles.signIn}>
                  {confirmPassword ? 'Log in' : 'Sign up'}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </ActionCard>
    </View>
  );
};

export default SignUpScreen;

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
    marginTop: HP(2),
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
