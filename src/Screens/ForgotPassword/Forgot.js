import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WP, HP } from '../../theme/PixelResponsive';
import { colors } from '../../theme/colors';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/button/CustomButton';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleResetPassword = () => {
    if (validateForm()) {
      setIsLoading(true);

    }
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FORGOT MY PASSWORD</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>Forgot your password?</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/Images/Logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <CustomTextInput
            placeholder="Enter the email you used to register"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.instructions}>
            We will send you a password reset link.
          </Text>

          <CustomButton 
            title={isLoading ? 'Sending...' : 'Reset my password'} 
            onPress={handleResetPassword} 
            style={styles.resetButton}
            textStyle={styles.buttonText}
            disabled={isLoading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign in now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign up now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>DUMMY </Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewPassword')}>
              <Text style={styles.signUpLink}>Sign up now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ForgotPassword;

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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
    textAlign: 'right',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: HP(2),
    paddingHorizontal: WP(5),
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
  logoContainer: {
    alignItems: 'center',
    marginTop: HP(2),
    marginBottom: HP(3),
  },
  logo: {
    width: WP(70),
    height: HP(20),
  },

  formContainer: {
    paddingHorizontal: WP(2),
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: HP(1.5),
    marginBottom: HP(0.5),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: HP(0.5),
    marginBottom: HP(1),
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 0,
  },
  instructions: {
    fontSize: 12,
    color: '#666',
    marginTop: HP(1),
    marginBottom: HP(3),
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: HP(1.8),
    marginTop: HP(2),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HP(2),
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  signInLink: {
    fontSize: 14,
    color: '#8B0000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  signUpLink: {
    fontSize: 14,
    color: '#8B0000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});