// BiometricAuth.js
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import NotificationOnApp from './NotificationOnApp';

export default function BiometricAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState(null);

  const generateAuthCode = async (biometricData) => {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      biometricData
    );
    return hash;
  };

  const handleAuthentication = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("Erro", "Dispositivo não suporta autenticação biométrica.");
      return;
    }

    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supportedTypes.length === 0) {
      Alert.alert("Erro", "Nenhuma biometria suportada encontrada.");
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("Erro", "Nenhuma biometria cadastrada.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autenticar",
      fallbackLabel: "Use senha",
    });

    if (result.success) {
      const biometricData = JSON.stringify(result); // Simulação de dados biométricos
      const code = await generateAuthCode(biometricData);
      setAuthCode(code);
      setIsAuthenticated(true);
      Alert.alert("Sucesso", `Biometria escaneada com sucesso!`);
      // Alert.alert("Sucesso", `Autenticação bem-sucedida! Código: ${code}`);
    } else {
      Alert.alert("Falha", "Autenticação falhou.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
    <Text style={styles.buttonText}>Escanear biometria</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
});

