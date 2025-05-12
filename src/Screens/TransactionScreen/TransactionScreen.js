import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HeaderS from '../../components/Header/HeaderS';
import BottomBar from '../../components/BottomBar/BottomBar';
import {WP, HP} from '../../theme/PixelResponsive';

const TransactionScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderS />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.showText}>SHOW</Text>
          <View style={styles.tabRow}>
            <TouchableOpacity>
              <Text style={[styles.tabText, styles.activeTab]}>May 11</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tabText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tabText}>Gifts</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tabText}>Points</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction Card 1 */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>CLAIMED REWARD <Text style={styles.redText}>- 250 ✪</Text></Text>
          <Text style={styles.boldText}>Lorem ipsum dolor sit amet</Text>
          <Text style={styles.stars}>45 ★★★★★</Text>
          <Text style={styles.cardDesc}>
            Lorem ipsum dolor sit amet, consectetur cing elit. Suspendisse mattis ullamcorper nisl uada sagittis.
          </Text>
          <View style={styles.cardFooterRow}>
            <Text style={styles.footerText}>Vape Cafe</Text>
            <Text style={styles.footerText}>May 11 - 2pm</Text>
          </View>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>H0585207</Text>
          </View>
        </View>

        {/* Transaction Card 2 */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>CLAIMED POINTS <Text style={styles.greenText}>+ 3 ✪</Text></Text>
          <Text style={styles.boldText}>Leaving a review</Text>
          <View style={styles.cardFooterRow}>
            <Text style={styles.footerText}>Vape Cafe</Text>
            <Text style={styles.footerText}>11 may - 2pm</Text>
          </View>
        </View>

        {/* Transaction Card 3 */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>RECEIVED POINTS <Text style={styles.greenText}>+ 2 ✪</Text></Text>
          <Text style={styles.cardHeader}>RECEIVED DISCOUNT <Text style={styles.discountText}>+ 1%</Text></Text>
          <Text style={styles.boldText}>Lorem ipsum dolor sit amet</Text>
          <Text style={styles.stars}>45 ★★★★★</Text>
          <Text style={styles.cardDesc}>
            Lorem ipsum dolor sit amet, consectetur cing elit. Suspendisse mattis ullamcorper nisl uada sagittis.
          </Text>
          <Text style={styles.boldText}>Action for which the bonus was claimed</Text>
          <View style={styles.cardFooterRow}>
            <Text style={styles.footerText}>Vape Cafe</Text>
            <Text style={styles.footerText}>May 11 - 2pm</Text>
          </View>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>H0585206</Text>
          </View>
        </View>
      </ScrollView>

      <BottomBar />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: HP(15),
    paddingHorizontal: WP(5),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: HP(2),
    justifyContent: 'space-between',
  },
  showText: {
    fontSize: WP(3.5),
    fontWeight: 'bold',
    marginRight: WP(2),
  },
  tabRow: {
    flexDirection: 'row',
    gap: WP(3),
  },
  tabText: {
    fontSize: WP(3.5),
    color: '#777',
  },
  activeTab: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: WP(3),
    padding: WP(4),
    marginBottom: HP(2),
  },
  cardHeader: {
    fontSize: WP(3.5),
    fontWeight: 'bold',
    marginBottom: HP(0.5),
  },
  boldText: {
    fontSize: WP(3.8),
    fontWeight: 'bold',
    marginBottom: HP(0.5),
  },
  stars: {
    color: '#ffc107',
    fontSize: WP(3.5),
    marginBottom: HP(0.5),
  },
  cardDesc: {
    fontSize: WP(3.2),
    color: '#333',
    marginBottom: HP(1),
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HP(1),
  },
  footerText: {
    fontSize: WP(3.3),
    color: '#555',
  },
  codeBox: {
    backgroundColor: '#fff',
    padding: HP(1.5),
    alignItems: 'center',
    borderRadius: WP(2),
  },
  codeText: {
    fontSize: WP(4.5),
    letterSpacing: WP(1),
    fontWeight: '500',
    color: '#222',
  },
  redText: {
    color: '#b30000',
  },
  greenText: {
    color: '#007e33',
  },
  discountText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});
