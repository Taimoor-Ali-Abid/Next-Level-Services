import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {WP, HP} from '../../theme/PixelResponsive';
import {colors} from '../../theme/colors';
import ActionCard from '../../components/card/ActionCard';
import CustomButton from '../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AppleIcon from '../../assets/Icons/Apple.svg';
const AppDownloadScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />

      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ActionCard style={styles.cardStyle}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Images/Logo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <Text style={styles.cardTitle}>
            Get access to thousands of unique rewards from your favorite vape
            shops.
          </Text>

          <Text style={styles.downloadText}>Download the app now</Text>

          <View>
            {/* <Image source={require('../../assets/Images/Googleplay.png')}
            style={styles.Google}
            resizeMode="contain"
            /> */}
            <AppleIcon />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('PreQrScan2')}>
            <Text>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </ActionCard>
    </View>
  );
};

export default AppDownloadScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'black',
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
  cardStyle: {
    marginTop: HP(2),
    flex: 1,
    backgroundColor: '#8B0000',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: HP(2),
    marginBottom: HP(2),
  },
  logo: {
    width: WP(100),
    height: HP(30),
    marginTop: HP(-6),
  },
  contentContainer: {
    paddingHorizontal: WP(5),
    paddingBottom: HP(4),
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: HP(2.2),
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: HP(3),
    fontWeight: '300',
    lineHeight: HP(3),
  },
  downloadText: {
    fontSize: HP(2.5),
    color: '#ffffff',
    fontWeight: '300',
    marginBottom: HP(3),
  },
  Google: {
    width: WP(70),
    height: HP(40),
    marginTop: HP(-2),
  },
});
