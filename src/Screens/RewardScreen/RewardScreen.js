import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../../components/BottomBar/BottomBar';
import R1 from '../../assets/Images/R1.png';
import R2 from '../../assets/Images/R2.png';
import R3 from '../../assets/Images/R3.png';
import R4 from '../../assets/Images/R4.png';
import VapeLogo from '../../assets/Images/VapeLogo.png';
import HeaderS from '../../components/Header/HeaderS';
import { WP, HP } from '../../theme/PixelResponsive';

// ...same imports

const RewardScreen = () => {
    const navigation = useNavigation();
  
    const rewards = [
      {
        id: 1,
        title: "Discount",
        description: "Picture No 1",
        points: 450,
        image: null,
        backgroundColor: '#FF9E8A'
      },
      {
        id: 2,
        title: "Picture No 2",
        description: "",
        points: 450,
        image: R2,
        backgroundColor: '#fff'
      },
      {
        id: 3,
        title: "Picture No3",
        description: "",
        points: 320,
        image: R3,
        backgroundColor: '#fff'
      },
      {
        id: 4,
        title: "Picture No 4",
        description: "",
        points: 160,
        image: R4,
        backgroundColor: '#D8F5C5' 
      }
    ];
  
    return (
      <View style={styles.container}>
        <HeaderS />
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>REWARDS STORE</Text>
          <View style={{ width: WP(6) }} />
        </View>
  
        <ScrollView style={styles.content}>
          <View style={styles.storeHeader}>
            <Image source={VapeLogo} style={styles.storeIcon} />
            <Text style={styles.storeTitle}>Vape Cafe</Text>
          </View>
  
          <View style={styles.rewardsGrid}>
            {rewards.map((reward) => (
              <TouchableOpacity
                key={reward.id}
                style={[styles.rewardCard, { backgroundColor: reward.backgroundColor }]}
                onPress={() => navigation.navigate('RewardScreenT', { reward })}
              >
                {reward.image ? (
                  <Image source={reward.image} style={styles.rewardImage} />
                ) : (
                  <View style={styles.discountIconContainer}>
                    <Text style={styles.discountIcon}>%</Text>
                  </View>
                )}
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.pointsText}>
                    {reward.points} <Text style={styles.closeIcon}>⊗</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
  
        <BottomBar />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: WP(5),
      paddingVertical: HP(2),
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    backButton: {
      padding: WP(1),
    },
    backButtonText: {
      fontSize: WP(6),
      fontWeight: 'bold',
    },
    navTitle: {
      fontSize: WP(4.5),
      fontWeight: 'bold',
      color: '#000',
    },
    content: {
      flex: 1,
      backgroundColor: '#fff',
    },
    storeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: WP(5),
      paddingVertical: HP(2),
    },
    storeIcon: {
      width: WP(6),
      height: WP(6),
      marginRight: WP(2),
    },
    storeTitle: {
      fontSize: WP(4.5),
      fontWeight: 'bold',
      color: '#000',
    },
    rewardsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: WP(4),
    },
    rewardCard: {
      width: '48%',
      borderRadius: WP(3),
      marginBottom: HP(2),
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    rewardImage: {
      width: '100%',
      height: HP(20),
      resizeMode: 'cover',
      borderTopLeftRadius: WP(3),
      borderTopRightRadius: WP(3),
    },
    rewardInfo: {
      padding: WP(3),
      backgroundColor: '#fff',
    },
    rewardTitle: {
      fontSize: WP(3.5),
      color: '#000',
      marginBottom: HP(0.5),
    },
    pointsText: {
      fontSize: WP(3),
      fontWeight: 'bold',
      color: '#000',
    },
    closeIcon: {
      color: '#ff4444',
      fontSize: WP(3),
    },
    discountIconContainer: {
      height: HP(14),
      justifyContent: 'center',
      alignItems: 'center',
    },
    discountIcon: {
      fontSize: WP(10),
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
  export default RewardScreen;
  