// HomeScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, NormalText, ButtonGroup } from '../components/FrontEndCR'; // Substitua pelo caminho correto do seu componente FrontEndCR

const HomeScreen = ({ navigation }) => {
  const buttons = [
    { label: 'Sala 14', screenName: 'Acesso por biometria' }, // Nome da tela como uma string
    { label: 'Sala 15', screenName: 'Acesso por biometria' }, // Nome da tela como uma string
    { label: 'Sala 16', screenName: 'Acesso por biometria' }, // Nome da tela como uma string
  ];

  return (
    <View style={styles.container}>
      <Title titulo="Sistema de abrir portas" />
      <NormalText texto="Portas em que você tem acesso:" />
      <ButtonGroup buttons={buttons} navigation={navigation} />
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

export default HomeScreen;
