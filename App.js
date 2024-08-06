import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import FormComponent from './components/FormComponent';
import Header from './components/HeaderComponent';
import Setor from './apps/Setor';
import Historico from './apps/Historico';

const Stack = createStackNavigator();

// Dados de exemplo para os dropdowns (substitua pelos seus dados reais)
const areas = [
  { id: 1, area: 'Tecnologia' },
  { id: 2, area: 'Recursos Humanos' },
  // ... outras áreas
];

const locais = [
  { id: 1, local: 'Sala de Reunião 1' },
  { id: 2, local: 'Auditório' },
  // ... outros locais
];

const fields = [
  ['text', 'Resposta Curta'],
  ['picker', 'Área', areas.map(area => area.area)],
  ['picker', 'Local', locais.map(local => local.local)],
  ['textarea', 'Descrição'],
  ['upload', 'Imagem'],
];

function FeedbackForm({ navigation }) {
  const headerTitle = "Col@bore!";

  const handleSetorPress = () => {
    navigation.navigate('Setor');
  };

  const handleHistoricoPress = () => {
    navigation.navigate('Historico');
  };

  const headerItems = [
    { name: 'Setor', onPress: handleSetorPress },
    { name: 'Histórico', onPress: handleHistoricoPress },
  ];

  return (
    <View style={styles.appContainer}>
      <Header title={headerTitle} items={headerItems} navigation={navigation} />
      <ScrollView style={styles.formContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Formulário de Feedback</Text>
          <FormComponent fields={fields} />
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FeedbackForm">
        <Stack.Screen name="FeedbackForm" component={FeedbackForm} options={{ headerShown: false }} />
        <Stack.Screen name="Setor" component={Setor} />
        <Stack.Screen name="Historico" component={Historico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
