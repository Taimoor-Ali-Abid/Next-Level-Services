import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import HeaderS from '../../components/Header/HeaderS';
import ActionCardBalance from '../../components/card/ActionCardBalance';
import BottomBar from '../../components/BottomBar/BottomBar';

const BalanceScreenThree = () => {
  return (
    <View style={styles.container}>
      <HeaderS title="Balance" />
      <ScrollView style={styles.content}>
        <ActionCardBalance/>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

export default BalanceScreenThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
});