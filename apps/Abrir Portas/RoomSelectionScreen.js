import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, NormalText, ButtonGroup } from '../../components/FrontEndCR'; // Substitua pelo caminho correto do seu componente FrontEndCR
import {NotificationOnApp} from '../../components/NotificationOnApp'; // Verifique o caminho correto para Notification

const RoomSelectionScreen = ({ navigation }) => {
  const buttons = [
    { label: 'Sala 14', screenName: 'AcessoPorBiometria' },
    { label: 'Sala 15', screenName: 'AcessoPorBiometria' },
    { label: 'Sala 16', screenName: 'AcessoPorBiometria' },
    { label: 'Sala 17', screenName: 'AcessoPorBiometria' },
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

export default RoomSelectionScreen;
