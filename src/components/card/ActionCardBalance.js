import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView } from 'react-native';
import GiftImage from '../../assets/Images/GiftImage.png';
import { WP, HP } from '../../theme/PixelResponsive';
import { useNavigation } from '@react-navigation/native';

const ActionCardBalance = () => {
  const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();

  return (
    <ScrollView>
    <View style={styles.card}>
      <Text style={styles.header}>Gold level gift</Text>
      <Text style={styles.subHeader}>AWARDED FOR</Text>
      <Image source={GiftImage} style={styles.giftImage} />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsChecked(!isChecked)}
      >
        <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>Reached 180 points on this store</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.descriptionTitle}>Hello World!!!!!!</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.star}>★</Text>
        <Text style={styles.star}>★</Text>
        <Text style={styles.star}>★</Text>
        <Text style={styles.star}>★</Text>
      </View>
      <Text style={styles.descriptionText}>
                        Hello, this is a sample text to show the description of the gift. It can be a bit longer to fill the space and give a better idea of how it looks.            
      </Text>

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('RewardScreen')}>
          <Text style={styles.primaryButtonText}>CLAIM REWARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: WP(3),
    padding: WP(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: HP(0.5) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: WP(4),
    minHeight: HP(60),
  },
  giftImage: {
    width: WP(70),
    height: WP(70),
    resizeMode: 'contain',
    marginBottom: HP(2),
    alignSelf: 'center',
  },
  header: {
    fontSize: WP(5),
    fontWeight: 'bold',
    color: '#990820',
    marginBottom: HP(2),
  },
  subHeader: {
    fontSize: WP(3.5),
    fontWeight: '600',
    color: '#333',
    marginBottom: HP(1),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(2),
  },
  checkbox: {
    width: WP(5),
    height: WP(5),
    borderWidth: 1,
    borderColor: '#990820',
    borderRadius: WP(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: WP(2),
  },
  checkedBox: {
    backgroundColor: '#990820',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: WP(3),
  },
  checkboxLabel: {
    fontSize: WP(3.5),
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: HP(2),
  },
  descriptionTitle: {
    fontSize: WP(4),
    fontWeight: '600',
    color: '#333',
    marginBottom: HP(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: HP(1),
  },
  star: {
    color: '#990820',
    fontSize: WP(5),
    marginRight: WP(1),
  },
  descriptionText: {
    fontSize: WP(3.5),
    color: '#666',
    lineHeight: HP(2.8),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HP(2),
  },
  primaryButton: {
    backgroundColor: '#990820',
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(5),
    borderRadius: WP(2),
    flex: 1,
    marginRight: WP(2),
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: WP(3.5),
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(5),
    borderRadius: WP(2),
    flex: 1,
    marginLeft: WP(2),
  },
  secondaryButtonText: {
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: WP(3.5),
  },
});

export default ActionCardBalance;
