// BaseScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, NormalText } from '../components/FrontEndCR';

const BaseScreen = ({ children }) => {
  return (
    <View style={styles.container}>
      <Title titulo="Título Padrão" />
      <NormalText texto="Texto padrão." />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default BaseScreen;
