import { StyleSheet, Text, View } from 'react-native';
import FormComponent from './components/FormComponent';
import React, { useState, useEffect } from 'react'; // Importe o useEffect
import { createDatabase, createTable } from './components/SQLComponent'; // Importa as funções necessárias

export default function App() {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const databaseName = 'PCI'; // Nome do banco de dados
        const tableName = 'pessoas'; // Nome da tabela
        // const db = await createDatabase(databaseName); // Cria o banco de dados

        createTable(databaseName, tableName, [ // Cria a tabela "pessoas"
          ['nomeCompleto', 'TEXT'],
          ['dataNascimento', 'TEXT'],
          ['genero', 'TEXT'],
          ['nivelEscolaridade', 'TEXT'],
          ['interesses', 'TEXT'],
          ['sobreVoce', 'TEXT'],
          ['fotoPerfil', 'TEXT'],
          ['informacoesAdicionais', 'TEXT'],
        ]);
      } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
      }
    };

    initializeDatabase(); // Chama a função para inicializar o banco de dados e a tabela
  }, []); // Executa apenas uma vez na montagem do componente



  const fields = [
    ['text', 'Nome Completo'],
    ['date', 'Data de Nascimento'],
    ['radio', 'Gênero', ['Masculino', 'Feminino', 'Outro']],
    ['picker', 'Nível de Escolaridade', ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior']],
    ['checkbox', 'Interesses', ['Tecnologia', 'Esportes', 'Música', 'Viagens']],
    ['textarea', 'Sobre Você'],
    ['upload', 'Foto de Perfil'],
    ['collapse', 'Informações Adicionais', [
      ['textarea', 'Hobbies e Interesses'],
      ['checkbox', 'Esportes', []], // Sem opções de checkbox (causará erro)
    ]],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Pessoa</Text>

      <FormComponent fields={fields} databaseName="PCI" tableName="pessoas" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },  
});
