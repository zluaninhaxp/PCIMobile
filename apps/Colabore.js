import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
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

export default function App() {
  const [visibleSection, setVisibleSection] = useState('Form');

  const handleShowSection = (section) => {
    setVisibleSection(section);
  };

  const headerTitle = "Col@bore!";

  const headerItems = [
    ['Formulário', 'button', () => handleShowSection('Form')],
    ['Setor', 'button', () => handleShowSection('Setor')],
    ['Histórico', 'button', () => handleShowSection('Historico')],
  ];

  return (
    <View style={styles.appContainer}>
      <Header title={headerTitle} items={headerItems} />
      <ScrollView style={styles.formContainer}>
        <View style={styles.container}>
          {visibleSection === 'Form' && (
            <View>
              <Text style={styles.title}>Formulário de Feedback</Text>
              <FormComponent fields={fields} />
            </View>
          )}
          {visibleSection === 'Setor' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bom dia</Text>
            </View>
          )}
          {visibleSection === 'Historico' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bom noite</Text>
            </View>
          )}
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
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});