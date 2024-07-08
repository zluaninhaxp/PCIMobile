import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação dos componentes
import HomeScreen from './Index'; // Verifique se o caminho está correto
import RoomSelectionScreen from './apps/Abrir Portas/RoomSelectionScreen'; // Verifique se o caminho está correto
import DetailScreen from './apps/Abrir Portas/DetailScreen'; // Verifique se o caminho está correto

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RoomSelection" component={RoomSelectionScreen} />
        <Stack.Screen name="AcessoPorBiometria" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
