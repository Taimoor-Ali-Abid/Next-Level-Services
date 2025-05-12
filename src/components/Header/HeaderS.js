import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Star } from "react-native-feather";
import { WP, HP } from "../../theme/PixelResponsive";

const HeaderS = () => {
  return (
    <LinearGradient
      colors={["#000000", "rgba(0,0,0,0.8)"]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.balanceContainer}>
        <Star fill="#FFC107" stroke="#FFC107" width={24} height={24} />
        <View style={styles.balanceTextContainer}>
          <Text style={styles.balanceLabel}>Current balance</Text>
          <Text style={styles.balanceValue}>120pts</Text>
        </View>
      </View>
      <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.profileImage} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP(4),
    paddingTop: HP(4),
    paddingBottom: HP(1.2),
  },
  balanceContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  balanceTextContainer: { 
    marginLeft: WP(2) 
  },
  balanceLabel: { 
    color: '#fff', 
    fontSize: WP(3.5) 
  },
  balanceValue: { 
    color: '#fff', 
    fontSize: WP(4.5), 
    fontWeight: 'bold' 
  },
  profileImage: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(5),
  },
});

export default HeaderS;