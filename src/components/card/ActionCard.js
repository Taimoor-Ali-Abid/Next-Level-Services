import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WP, HP } from '../../theme/PixelResponsive';

const ActionCard = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: WP(100),
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignSelf: 'center',
    elevation: 5,
  },
});