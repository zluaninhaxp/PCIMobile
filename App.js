import React from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import FormComponent from './components/FormComponent';
import Header from './components/HeaderComponent';

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

const handleSetorPress = () => {
  console.log('Setor button pressed');
};

const handleHistoricoPress = () => {
  console.log('Histórico button pressed');
};

const headerTitle = "Col@bore!";
const headerItems = [
  { name: 'Setor', onPress: handleSetorPress },
  { name: 'Histórico', onPress: handleHistoricoPress },
];

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Header title={headerTitle} items={headerItems}/>
      <ScrollView style={styles.formContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Col@bore!</Text>
          <FormComponent fields={fields} />
        </View>
      </ScrollView>
    </View>
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