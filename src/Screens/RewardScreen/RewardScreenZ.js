import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {WP, HP} from '../../theme/PixelResponsive';
import HeaderS from '../../components/Header/HeaderS';
import BottomBar from '../../components/BottomBar/BottomBar';
import VapeLogo from '../../assets/Images/VapeLogo.png';
import Product1 from '../../assets/Images/RewardSc.png';
import CustomTextInput from '../../components/TextInput/CustomTextInput';

const RewardScreenZ = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderS />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Store Info */}
        <View style={styles.storeHeader}>
          <Image source={VapeLogo} style={styles.storeIcon} />
          <Text style={styles.storeTitle}>Vape Cafe</Text>
        </View>

        {/* Product Images */}
        <View style={styles.productRow}>
          <Image source={Product1} style={styles.productImage} />
          <Image source={Product1} style={styles.productImage} />
        </View>

        {/* Review Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>RATE THIS PRODUCT</Text>
          {/* Stars Row */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(i => (
              <Text key={i} style={[styles.star, i === 1 && styles.activeStar]}>
                ★
              </Text>
            ))}
          </View>

          <Text style={styles.cardSubtitle}>LEAVE A COMMENT</Text>
          <CustomTextInput
            placeholder="Type your comment..."
            multiline
            inputStyle={styles.textInput}
          />
          {/* Buttons */}
          <TouchableOpacity style={styles.addReviewButton}>
            <Text style={styles.addReviewText}>ADD REVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <BottomBar />
    </View>
  );
};

export default RewardScreenZ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: HP(15),
    paddingHorizontal: WP(5),
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HP(2),
    marginBottom: HP(1),
  },
  storeIcon: {
    width: WP(8),
    height: WP(6),
    marginRight: WP(2),
  },
  storeTitle: {
    fontSize: WP(4),
    fontWeight: 'bold',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HP(2),
  },
  productImage: {
    width:  WP(40),
    height: HP(25),
    borderRadius: WP(3),
    resizeMode: 'cover',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: WP(4),
    padding: WP(5),
    marginTop: HP(6),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: WP(3.5),
    marginBottom: HP(1),
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: HP(2),
  },
  star: {
    fontSize: WP(6),
    color: '#eee',
    marginRight: WP(1),
  },
  activeStar: {
    color: '#f5a623',
  },
  cardSubtitle: {
    fontWeight: 'bold',
    fontSize: WP(3.5),
    marginBottom: HP(1),
  },
  textInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: WP(2),
    padding: WP(3),
    fontSize: WP(3.3),
    color: '#333',
    height: HP(12),
    marginBottom: HP(2),
  },
  addReviewButton: {
    backgroundColor: '#aa0d1e',
    borderRadius: WP(2),
    paddingVertical: HP(1.5),
    alignItems: 'center',
    marginBottom: HP(1),
  },
  addReviewText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: WP(4),
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: WP(2),
    paddingVertical: HP(1.5),
    alignItems: 'center',
  },
  cancelText: {
    fontSize: WP(4),
    color: '#555',
  },
});
