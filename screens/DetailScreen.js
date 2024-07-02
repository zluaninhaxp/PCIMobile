import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Title, NormalText, SubTitle } from '../components/FrontEndCR';
import BiometricAuth from '../components/BiometricAuth';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Title titulo="Sala número ..." />
      <SubTitle subTitulo="Essa porta de encontra: (fechada/aberta)" />
      <NormalText texto="Abra/Feche a porta:" />
      <BiometricAuth />
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
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default DetailScreen;
