// App.js
import React, { useEffect } from 'react';
import NotificationService from './components/Notification';

const App = () => {
  useEffect(() => {
    // Configurar as notificações ao inicializar o aplicativo
    NotificationService.configure();

    return () => {
      // Remover os listeners ao desmontar o componente
      NotificationService.removeListeners();
    };
  }, []);

  return NotificationService.renderButton();
};

export default App;
