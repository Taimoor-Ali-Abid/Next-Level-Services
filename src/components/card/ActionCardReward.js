import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WP, HP } from '../../theme/PixelResponsive';
import { useNavigation } from '@react-navigation/native';

const ActionCardReward = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.purchaseBtn}onPress={()=>navigation.navigate('RewardScreenZ')}>
        <Text style={styles.purchaseText}>PURCHASE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionCardReward;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    marginHorizontal: WP(5),
    padding: WP(4),
    borderRadius: WP(3),
    marginBottom: HP(3),
  },
  purchaseBtn: {
    backgroundColor: '#aa0d1e',
    paddingVertical: HP(1.5),
    borderRadius: WP(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(5),
    marginBottom: HP(1.5),
  },
  purchaseText: {
    color: '#fff',
    fontSize: WP(4),
    fontWeight: 'bold',
  },
  goBackBtn: {
    backgroundColor: '#ccc',
    paddingVertical: HP(1.5),
    borderRadius: WP(2),
    alignItems: 'center',
    marginBottom: HP(4),
  },
  goBackText: {
    fontSize: WP(4),
    color: '#555',
    fontWeight: 'bold',
  },
});
