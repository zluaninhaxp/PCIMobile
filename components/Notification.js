import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Snackbar, Button, Text } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const NotificationOnApp = ({ title, message }) => {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>Mostrar Notificação</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text>{message}</Text>
      </Snackbar>
    </View>
  );
};

const PushNotificationHandler = () => {
   
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
});

export { NotificationOnApp, PushNotificationHandler };
