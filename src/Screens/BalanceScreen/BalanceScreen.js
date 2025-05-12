import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, FlatList, Image } from 'react-native';
import HeaderS from '../../components/Header/HeaderS';
import BottomBar from '../../components/BottomBar/BottomBar';
import LogoVape from '../../assets/Images/LogoVape.png';
import { WP, HP } from '../../theme/PixelResponsive';
import CustomButton from '../../components/button/CustomButton';
import { useNavigation } from '@react-navigation/native';
import BalanceScreenTwo from './BalanceScreenTwo';
const BalanceScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation();
  const transactions = [
    { id: '1', amount: '$ 250', date: 'May 11 - 2pm', reward: '5 ' },
    { id: '2', amount: '$ 250', date: 'May 11 - 2pm', reward: '2 ' },
    { id: '3', amount: '$ 2500', date: 'May 11 - 2pm', reward: '2%' },
  ];

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View>
        <Text style={styles.amountText}>{item.amount}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <Text style={styles.rewardText}>{item.reward}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderS />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <Image source={LogoVape} />
          <Text style={styles.brandText}>House of Vape</Text>
          <TouchableOpacity style={styles.storeButton}>
            <Text style={styles.storeButtonText}>VISIT REWARDS STORE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>ON</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
          <Text style={styles.toggleText}>Notify me of new rewards</Text>
        </View>

        <View style={styles.referralBox}>
          <Text style={styles.referralLabel}>REFERRAL CODE</Text>
          <Text style={styles.referralCode}>123456789</Text>
        </View>

        <View style={styles.pointsBox}>
          <Text style={styles.pointsTitle}>POINTS BALANCE</Text>

          <View style={styles.pointsRow}>
            <TouchableOpacity onPress={() => navigation.navigate(BalanceScreenTwo)  }>
              <Text style={[styles.levelText, { color: '#a05e2a' }]}>Bronze</Text>
            </TouchableOpacity>
            <Text style={styles.levelText}>Silver</Text>
            <Text style={[styles.levelText, { color: '#d4af37' }]}>Gold</Text>
          </View>

          <View style={styles.pointsRow}>
            <Text style={styles.pointsValue}>5</Text>
            <Text style={styles.pointsValue}>50</Text>
            <Text style={styles.pointsValue}>100</Text>
          </View>

          <View style={styles.pointsRow}>
            <Text style={styles.pointsSub}>%</Text>
            <Text style={styles.pointsSub}>2%</Text>
            <Text style={styles.pointsSub}>3%</Text>
          </View>

          <View style={styles.pointsRow}>
            <Text style={styles.pointsSub}>Discount</Text>
            <Text style={styles.pointsSub}>Discount</Text>
            <Text style={styles.pointsSub}>Discount</Text>
          </View>
        </View>

        <View style={styles.spentRow}>
          <Text style={styles.spentText}>MONEY SPENT IN SHOP</Text>
          <Text style={styles.discount}>+2% DISCOUNT</Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransactionItem}
          scrollEnabled={false}
        />
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: {
    paddingBottom: HP(12),
    paddingHorizontal: WP(4),
    backgroundColor: '#f8f8f8',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: HP(3),
    marginBottom: HP(2),
  },
  brandText: {
    fontSize: WP(5),
    fontWeight: '600',
    marginVertical: HP(1),
  },
  storeButton: {
    backgroundColor: '#870B1C',
    borderRadius: WP(2),
    paddingVertical: HP(1.2),
    paddingHorizontal: WP(5),
    marginTop: HP(1),
  },
  storeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: WP(4),
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: HP(2),
    padding: WP(4),
  },
  toggleLabel: {
    fontWeight: 'bold',
    marginRight: WP(2),
    color: '#333',
  },
  toggleText: {
    marginLeft: WP(2),
    fontSize: WP(3.8),
    color: '#333',
  },
  referralBox: {
    backgroundColor: '#fff',
    padding: WP(4),
    borderRadius: WP(2),
    marginBottom: HP(2),
    height: HP(6),
    flexDirection: 'row',
  },
  referralLabel: {
    fontSize: WP(3.5),
    color: '#999',
    fontWeight: '600',
    marginBottom: HP(0.5),
    marginRight: WP(30),
  },
  referralCode: {
    fontSize: WP(4.5),
    fontWeight: 'bold',
    color: '#333',
  },
  pointsBox: {
    backgroundColor: '#fff',
    borderRadius: WP(2),
    padding: WP(4),
    marginBottom: HP(2),
  },
  pointsTitle: {
    textAlign: 'center',
    fontSize: WP(4.5),
    fontWeight: '600',
    marginBottom: HP(1),
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: HP(0.5),
  },
  levelText: {
    fontWeight: 'bold',
    fontSize: WP(4),
    color: '#666',
  },
  pointsValue: {
    fontSize: WP(4),
    fontWeight: '600',
    color: '#000',
  },
  pointsSub: {
    fontSize: WP(3.5),
    color: '#888',
  },
  spentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: HP(1),
    paddingHorizontal: WP(2),
  },
  spentText: {
    fontSize: WP(4),
    fontWeight: '500',
    color: '#444',
  },
  discount: {
    fontSize: WP(4),
    fontWeight: '600',
    color: '#870B1C',
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: WP(4),
    borderRadius: WP(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HP(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  amountText: {
    fontSize: WP(4.2),
    fontWeight: '600',
    color: '#000',
  },
  dateText: {
    fontSize: WP(3.5),
    color: '#777',
    marginTop: HP(0.3),
  },
  rewardText: {
    fontSize: WP(4),
    fontWeight: 'bold',
    color: '#870B1C',
  },
});

export default BalanceScreen;
