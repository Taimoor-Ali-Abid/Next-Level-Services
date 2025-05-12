import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SplashIcon from "../../assets/Images/SplashIcon.png"; 
import SplashIcon2 from "../../assets/Images/SplashIcon2.png";
import SplashIcon3 from "../../assets/Images/SplashIcon3.png";

const SplashScreens = ({ navigation }) => {
  const [currentSplash, setCurrentSplash] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSplash < 2) {
        setCurrentSplash(currentSplash + 1);
      } else {
        navigation.replace("Login");
      }
    }, 2000); 

    return () => clearTimeout(timer);
  }, [currentSplash, navigation]);

  const splashImages = [SplashIcon, SplashIcon2, SplashIcon3];

  return (
    <LinearGradient
      colors={['#5E0A0A', '#FF003D']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}
    >
      <Image
        source={splashImages[currentSplash]}
        style={styles.splashImage}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '50%', 
    height: '50%',
  },
});

export default SplashScreens;