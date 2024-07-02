import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, NormalText, ButtonGroup } from '../components/FrontEndCR'; // Substitua pelo caminho correto do seu componente FrontEndCR
import {NotificationOnApp, PushNotificationHandler} from '../components/Notification'; // Verifique o caminho correto para Notification

const RoomSelectionScreen = ({ navigation }) => {
  const buttons = [
    { label: 'Sala 14', screenName: 'Acesso por biometria' },
    { label: 'Sala 15', screenName: 'Acesso por biometria' },
    { label: 'Sala 16', screenName: 'Acesso por biometria' },
  ];

  return (
    <View style={styles.container}>
      <Title titulo="Sistema de abrir portas" />
      <NormalText texto="Portas em que você tem acesso:" />
      <ButtonGroup buttons={buttons} navigation={navigation} />
      <NotificationOnApp title="Título da Notificação" message="Este é o texto da notificação." />
      <PushNotificationHandler />
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
