import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const Header = ({ title }) => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Header;