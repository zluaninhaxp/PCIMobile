import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Alert } from 'react-native';
import { Title } from '../components/FrontEndCR'; // Substitua pelo caminho correto do seu componente FrontEndCR
import jsSHA from 'jssha';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/auth/usuarios/');

      if (response.data && response.data.length > 0) {
        const user = response.data.find(user => user.username === username);

        if (user) {
          const hashedPasswordApp = generatePbkdf2Sha256(password, user.password);

          console.log('Senha digitada:', password);
          console.log('Hash gerado no aplicativo:', hashedPasswordApp);
          console.log('Hash da API:', user.password);

          // Comparando os hashes gerados
          if (hashedPasswordApp === user.password) {
            navigation.navigate('RoomSelection', { user });
          } else {
            Alert.alert('Erro', 'Usuário ou senha incorretos. Por favor, tente novamente.');
          }
        } else {
          Alert.alert('Erro', 'Usuário não encontrado. Por favor, verifique o nome de usuário.');
        }
      } else {
        Alert.alert('Erro', 'Não foi possível obter a lista de usuários. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
    }
  };

  // Função para gerar hash pbkdf2_sha256
  const generatePbkdf2Sha256 = (password, storedPassword) => {
    const [algorithm, iterations, salt, expectedHash] = storedPassword.split('$');
    const shaObj = new jsSHA('SHA-256', 'TEXT');

    shaObj.setHMACKey(password, 'TEXT');
    shaObj.update(salt);

    const hmac = shaObj.getHMAC('HEX');
    const generatedHash = `${algorithm}$${iterations}$${salt}$${hmac}`;

    return generatedHash;
  };

  return (
    <View style={styles.container}>
      <Title titulo="Login" />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;
