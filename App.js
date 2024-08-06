// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação dos componentes
import HomeScreen from './Index';
import LoginScreen from './LoginScreen';
import RoomSelectionScreen from './apps/Abrir Portas/RoomSelectionScreen';
import DetailScreen from './apps/Abrir Portas/DetailScreen';
import HomeAgricola from './apps/Agricola/HomeAgricola';
import HomeColabore from './apps/Colabore/HomeColabore';
import HomeEdificios from './apps/Edificios/HomeEdificios';
import HomeFlorestas from './apps/Florestas/HomeFlorestas';
import HomeGP from './apps/Gestão de Projetos/HomeGP';
import HomeIndustria from './apps/Industria/HomeIndustria';
import HomeMIA from './apps/MIA/HomeMIA';
import HomePecuaria from './apps/Pecuaria/HomePecuaria';
import HomeSeguranca from './apps/Segurança/HomeSeguranca';
import HomeSolicita from './apps/Solicita/HomeSolicita';
import HomeSustentabilidade from './apps/Sustentabilidade/HomeSustentabilidade';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="RoomSelection" component={RoomSelectionScreen} />
        <Stack.Screen name="AcessoPorBiometria" component={DetailScreen} />
        <Stack.Screen name="HomeAgricola" component={HomeAgricola} />
        <Stack.Screen name="HomeColabore" component={HomeColabore} />
        <Stack.Screen name="HomeEdificios" component={HomeEdificios} />
        <Stack.Screen name="HomeFlorestas" component={HomeFlorestas} />
        <Stack.Screen name="HomeGP" component={HomeGP} />
        <Stack.Screen name="HomeIndustria" component={HomeIndustria} />
        <Stack.Screen name="HomeMIA" component={HomeMIA} />
        <Stack.Screen name="HomePecuaria" component={HomePecuaria} />
        <Stack.Screen name="HomeSeguranca" component={HomeSeguranca} />
        <Stack.Screen name="HomeSolicita" component={HomeSolicita} />
        <Stack.Screen name="HomeSustentabilidade" component={HomeSustentabilidade} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// aaa