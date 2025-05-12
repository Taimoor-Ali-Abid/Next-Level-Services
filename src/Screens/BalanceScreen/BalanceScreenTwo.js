import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderS from '../../components/Header/HeaderS';
import BottomBar from '../../components/BottomBar/BottomBar';
import { WP, HP } from '../../theme/PixelResponsive';
import VapeLogo from '../../assets/Images/VapeLogo.png';
import CustomButton from '../../components/button/CustomButton';

const BalanceScreenTwo = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderS />

      {/* Back Arrow Button (Text only) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <Image source={VapeLogo} style={styles.logo} />
          <Text style={styles.title}>Vape Cafe</Text>
          <TouchableOpacity style={styles.rewardsBtn}>
            <Text style={styles.rewardsBtnText}>VISIT REWARDS STORE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.onText}>ON</Text>
          <Switch
            value={isEnabled}
            onValueChange={setIsEnabled}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          />
          <Text style={styles.notifyText}>Notify me of new rewards</Text>
        </View>

        <View style={styles.discountBox}>
          <Text style={styles.discountText}>STORE DISCOUNT (H 0585204)</Text>
          <Text style={styles.discountValue}>2%</Text>
        </View>

        <View style={styles.discountBoxInactive}>
          <Text style={styles.discountText}>STORE DISCOUNT (H 0585204)</Text>
          <Text style={styles.discountValue}>1%</Text>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsTitle}>POINTS BALANCE</Text>

          <View style={styles.levelRow}>
            <Text style={[styles.levelLabel, { color: '#a05e2a' }]}>Bronze</Text>
            <Text style={styles.levelLabel}>Silver</Text>
            <Text style={[styles.levelLabel, { color: '#d4af37' }]}>Gold</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <Text style={styles.currentPoints}>180</Text>
          </View>

          <View style={styles.benefitsRow}>
            <Text style={styles.benefitText}>% Discount</Text>
            <Text style={styles.benefitText}>2% Discount</Text>
            <Text style={styles.benefitText}>3% Discount</Text>
          </View>
          
        </View>
        <CustomButton
            title="Next Page"
            onPress={() => navigation.navigate('BalanceScreenThree')}
            buttonStyle={{
              marginTop: HP(2),
              width: WP(40), // or use '50%' if that works better for your layout
              height: HP(5), // controls button height
              paddingVertical: HP(1),
              paddingHorizontal: WP(3),
              alignSelf: 'center',
            }}
          
          />
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
  backButton: {
    position: 'absolute',
    top: HP(6),
    left: WP(1),
    zIndex: 10,
    padding: WP(1.5),
    marginTop: HP(5),
  },
  backButtonText: {
    fontSize: WP(6),
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: HP(12),
  },
  logoSection: {
    alignItems: 'center',
    marginTop: HP(3),
  },
  logo: {
    width: WP(50),
    height: WP(50),
    resizeMode: 'contain',
  },
  title: {
    fontSize: WP(5),
    fontWeight: '700',
    marginTop: HP(1.2),
    color: '#333',
  },
  rewardsBtn: {
    backgroundColor: '#870B1C',
    paddingHorizontal: WP(5),
    paddingVertical: HP(1),
    borderRadius: WP(2),
    marginTop: HP(1.2),
  },
  rewardsBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: WP(4),
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    marginVertical: HP(2),
  },
  onText: {
    fontWeight: 'bold',
    color: '#333',
    marginRight: WP(2),
  },
  notifyText: {
    marginLeft: WP(2),
    fontSize: WP(3.8),
    color: '#333',
  },
  discountBox: {
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: WP(4),
    marginHorizontal: WP(4),
    borderRadius: WP(2),
    marginBottom: HP(1),
  },
  discountBoxInactive: {
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: WP(4),
    marginHorizontal: WP(4),
    borderRadius: WP(2),
  },
  discountText: {
    color: '#555',
    fontSize: WP(3.5),
  },
  discountValue: {
    fontWeight: 'bold',
    fontSize: WP(4),
    color: '#000',
  },
  pointsContainer: {
    backgroundColor: '#fff',
    margin: WP(4),
    borderRadius: WP(3),
    padding: WP(4),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  pointsTitle: {
    textAlign: 'center',
    fontSize: WP(4.5),
    fontWeight: '600',
    marginBottom: HP(1),
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: HP(1),
  },
  levelLabel: {
    fontSize: WP(4),
    fontWeight: 'bold',
    color: '#999',
  },
  progressBar: {
    backgroundColor: '#eee',
    borderRadius: WP(10),
    height: HP(2.5),
    marginVertical: HP(1),
    justifyContent: 'center',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: '#870B1C',
    borderTopLeftRadius: WP(10),
    borderBottomLeftRadius: WP(10),
    width: '60%',
  },
  currentPoints: {
    alignSelf: 'flex-end',
    marginRight: WP(2),
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    right: WP(2),
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: HP(1),
  },
  benefitText: {
    fontSize: WP(3.5),
    color: '#666',
  },
});

export default BalanceScreenTwo;
