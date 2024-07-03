// NotificationService.js
import React from 'react';
import { Button, View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

class NotificationService {
  constructor() {
    this.configure();
    this.foregroundSubscription = null;
    this.backgroundSubscription = null;
  }

  configure = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Você precisa permitir as notificações para receber alertas.');
      return;
    }
    this.createNotificationChannel();
    this.setupListeners();
  };

  createNotificationChannel = () => {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });
  };

  sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.MAX,
        channelId: 'default',
      },
      trigger: { seconds: 1 },
    });
  };

  setupListeners = () => {
    // Listener para notificações recebidas enquanto o aplicativo está em primeiro plano
    this.foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    // Listener para resposta às notificações recebidas quando o usuário interage com a notificação (em segundo plano)
    this.backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response Received:', response);
    });
  };

  removeListeners = () => {
    if (this.foregroundSubscription) {
      this.foregroundSubscription.remove();
      this.foregroundSubscription = null;
    }
    if (this.backgroundSubscription) {
      this.backgroundSubscription.remove();
      this.backgroundSubscription = null;
    }
  };

  renderButton = () => {
    return (
      <View style={{ padding: 20 }}>
        <Text>Push Notification Example</Text>
        <Button
          title="Send Local Notification"
          onPress={() => this.sendNotification('Test Title', 'Test Message')}
        />
      </View>
    );
  };
}

const notificationService = new NotificationService();
export default notificationService;
