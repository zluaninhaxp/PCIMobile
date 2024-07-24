import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Picker, TouchableOpacity, ScrollView } from 'react-native';

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

export default function App() {
  const [formData, setFormData] = useState({
    respostaCurta: '',
    dropdownArea: '',
    dropdownLocal: '',
    respostaLonga: '',
    imagem: null,
  });

  const handleSubmit = () => {
    // Lógica para enviar o formulário (você irá implementar isso mais tarde)
    console.log(formData);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Formulário de Feedback</Text>

        {/* Resposta Curta */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Resposta Curta:</Text>
          <TextInput
            style={styles.input}
            value={formData.respostaCurta}
            onChangeText={(text) => setFormData({ ...formData, respostaCurta: text })}
          />
        </View>

        {/* Dropdown Área */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Área:</Text>
          <Picker
            selectedValue={formData.dropdownArea}
            onValueChange={(itemValue) => setFormData({ ...formData, dropdownArea: itemValue })}
          >
            <Picker.Item label="" value="" />
            {areas.map((area) => (
              <Picker.Item key={area.id} label={area.area} value={area.id} />
            ))}
          </Picker>
        </View>

        {/* Dropdown Local */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Local:</Text>
          <Picker
            selectedValue={formData.dropdownLocal}
            onValueChange={(itemValue) => setFormData({ ...formData, dropdownLocal: itemValue })}
          >
            <Picker.Item label="" value="" />
            {locais.map((local) => (
              <Picker.Item key={local.id} label={local.local} value={local.id} />
            ))}
          </Picker>
        </View>

        {/* Resposta Longa */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={formData.respostaLonga}
            onChangeText={(text) => setFormData({ ...formData, respostaLonga: text })}
          />
        </View>

        {/* Imagem (substituir por componente de upload de imagem) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Imagem:</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => { /* Lógica para escolher imagem */ }}
          >
            <Text style={styles.uploadButtonText}>Escolher Imagem</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Resposta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centraliza o texto
  },
  formContainer: {
    backgroundColor: '#fff', // Fundo branco (equivalente a bg-white)
    padding: 20,
    borderRadius: 10, // Cantos arredondados
    shadowColor: '#000', // Sombra (equivalente a shadow-sm)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Sombra para Android
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#007bff', // Cor de fundo azul (equivalente a btn-primary)
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }, 
});
