import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RewardCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.cardTop}>
        <Text style={styles.points}>
          <Text style={styles.star}>★</Text> 3 points
        </Text>
      </View>

      <View style={styles.dashedLineContainer}>
        <Text style={styles.scissors}>sa</Text>
        <View style={styles.dashedLine} />
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.awardedFor}>AWARDED FOR</Text>
        <View style={styles.descriptionRow}>
          <Text style={styles.check}>✅</Text>
          <Text style={styles.description}>Visit the store twice in one week</Text>
        </View>

        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimText}>CLAIM REWARD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    overflow: 'hidden',
    width: 320,
    alignSelf: 'center',
  },
  cardTop: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  points: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  star: {
    color: '#B00020',
    fontSize: 22,
  },
  dashedLineContainer: {
    position: 'relative',
    height: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scissors: {
    position: 'absolute',
    left: 12,
    top: 2,
    fontSize: 14,
  },
  dashedLine: {
    width: '90%',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B00020',
  },
  cardBottom: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  awardedFor: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    marginBottom: 6,
    fontWeight: '500',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  check: {
    fontSize: 16,
    color: 'green',
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  claimButton: {
    backgroundColor: '#B00020',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  claimText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 12,
  },
  cancelText: {
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RewardCard;
