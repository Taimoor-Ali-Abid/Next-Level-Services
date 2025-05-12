import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderS from '../../components/Header/HeaderS';
import BottomBar from '../../components/BottomBar/BottomBar';
import { WP, HP } from '../../theme/PixelResponsive';
import RewardSc from '../../assets/Images/RewardSc.png';
import VapeLogo from '../../assets/Images/VapeLogo.png';
import ActionCard from '../../components/card/ActionCard';
import ActionCardReward from '../../components/card/ActionCardReward';

const RewardScreenT = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with current balance */}
      <View >
        <HeaderS />
      </View>

      {/* Custom Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>REWARDS STORE</Text>
        <View style={{ width: WP(6) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Store Info */}
        <View style={styles.storeHeader}>
          <Image source={VapeLogo} style={styles.storeIcon} />
          <Text style={styles.storeTitle}>Vape Cafe</Text>
        </View>

        {/* Reward Image */}
        <Image source={RewardSc} style={styles.rewardImage} />

        {/* Action Card */}
        <ActionCard />

        {/* Reward Info */}
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardTitle}>Hello This is Dummy Text</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.reviewCount}>45</Text>
            <TouchableOpacity>
              <Text style={styles.reviewLink}>
                Leave review  <Text style={styles.closeIcon}>⊗</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
          Hello This is Dummy Description
          </Text>
        </View>

        {/* Reviews */}
        <Text style={styles.reviewsTitle}>REVIEWS</Text>

        {[1, 2].map((_, i) => (
          <View key={i} style={styles.reviewItem}>
            <Text style={styles.reviewer}>Debbie Harry</Text>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.reviewText}>
            Hello This is Dummy Review
            </Text>
          </View>
        ))}
      </ScrollView>
        <View>
        <ActionCardReward/>
        </View>
    
      <BottomBar />
    </View>
  );
};

export default RewardScreenT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(5),
    paddingTop: HP(5),
    paddingBottom: HP(2),
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
  },
  backArrow: {
    fontSize: WP(6),
    fontWeight: 'bold',
  },
  title: {
    fontSize: WP(4.5),
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: WP(5),
    paddingBottom: HP(12),
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(2),
  },
  storeIcon: {
    width: WP(6),
    height: WP(6),
    marginRight: WP(2),
  },
  storeTitle: {
    fontSize: WP(4),
    fontWeight: 'bold',
  },
  rewardImage: {
    width: '100%',
    height: HP(20),
    borderRadius: WP(3),
    resizeMode: 'cover',
    marginBottom: HP(2),
  },
  rewardInfo: {
    marginBottom: HP(2),
  },
  rewardTitle: {
    fontSize: WP(4),
    fontWeight: 'bold',
    marginBottom: HP(1),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: WP(3.5),
    color: '#000',
  },
  reviewLink: {
    fontSize: WP(3.2),
    color: '#007bff',
    fontWeight: '500',
  },
  closeIcon: {
    color: '#d11a2a',
  },
  description: {
    fontSize: WP(3.2),
    color: '#555',
    marginTop: HP(1),
  },
  reviewsTitle: {
    fontSize: WP(3.8),
    fontWeight: 'bold',
    marginBottom: HP(1),
  },
  reviewItem: {
    marginBottom: HP(1.5),
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: HP(1),
  },
  reviewer: {
    fontWeight: 'bold',
    fontSize: WP(3.5),
  },
  stars: {
    color: '#FFA500',
    fontSize: WP(3.5),
    marginVertical: HP(0.5),
  },
  reviewText: {
    fontSize: WP(3.2),
    color: '#555',
  },
  bottomActions: {
    position: 'absolute',
    bottom: HP(7),
    left: WP(5),
    right: WP(5),
  },
  purchaseBtn: {
    backgroundColor: '#aa0d1e',
    paddingVertical: HP(1.5),
    borderRadius: WP(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(5),
    marginBottom: HP(1),
  },
  purchaseText: {
    color: '#fff',
    fontSize: WP(4),
    fontWeight: 'bold',
  },
  purchasePts: {
    color: '#fff',
    fontSize: WP(4),
    fontWeight: 'bold',
  },
  goBackBtn: {
    backgroundColor: '#ccc',
    paddingVertical: HP(1.5),
    borderRadius: WP(2),
    alignItems: 'center',
  },
  goBackText: {
    fontSize: WP(4),
    color: '#555',
  },
});
