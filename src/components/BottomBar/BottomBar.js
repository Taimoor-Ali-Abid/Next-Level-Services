import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { WP, HP } from '../../theme/PixelResponsive';
import Homeicon from '../../assets/Icons/Homeicon.svg';
import Bars from '../../assets/Icons/Bars.svg';
import Hut from '../../assets/Icons/Hut.svg';
import Gift from '../../assets/Icons/Gift.svg';
import Person from '../../assets/Icons/Person.svg';
import Notification from '../../assets/Icons/Notification.svg';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Map route names to tab keys
  const routeToTabKey = {
    HomeScreen: 'Home',
    ProfileSettingScreen: 'Profile',
    BalanceScreen: 'Balance',
    RewardScreen: 'Reward',
    TransactionScreen: 'Transaction',
    NotificationScreen: 'Notification',
  };

  const currentTabKey = routeToTabKey[route.name] || 'Home';

  const tabs = [
    {
      key: 'Home',
      icon: <Homeicon width={WP(6)} height={HP(3)} />,
      onPress: () => navigation.navigate('HomeScreen'),
    },
    {
      key: 'Profile',
      icon: <Person width={WP(6)} height={HP(3)} />,
      onPress: () => navigation.navigate('ProfileSettingScreen'),
    },
    {
      key: 'Balance',
      icon: <Gift width={WP(6)} height={HP(3)} />,
      onPress: () => navigation.navigate('BalanceScreen'),
    },
    {
      key: 'Reward',
      icon: <Hut width={WP(6)} height={HP(3)} />,
      onPress: () => navigation.navigate('RewardScreen'),
    },
    {
      key: 'Transaction',
      icon: <Bars width={WP(6)} height={HP(3)} />,
      onPress: () => navigation.navigate('TransactionScreen'),
    },
    {
      key: 'Notification',
      icon: <Notification width={WP(6)} height={HP(3)} />,
      onPress: () => navigation.navigate('NotificationScreen'),
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            currentTabKey === tab.key && styles.activeTab,
          ]}
          onPress={tab.onPress}
        >
          {tab.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: HP(8),
    backgroundColor: '#990820',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: WP(2),
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: WP(2),
    flex: 1,
    borderRadius: WP(2),
  },
  activeTab: {
    backgroundColor: '#b7223a',
  },
});

export default BottomBar;
