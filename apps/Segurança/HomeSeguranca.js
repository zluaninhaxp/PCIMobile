import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BaseScreen from './../BaseScreen';
import { Title, NormalText, ButtonGroup } from '../../components/FrontEndCR';
import { QRCodeScannerComponent } from '../../components/CameraComponent';

const HomeSeguranca = () => {
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleQRCodeScanned = (data) => {
    // Handle the scanned QR code data
    console.log(data);
    setIsScannerVisible(false); // Hide the scanner after scanning
  };

  const toggleScanner = () => {
    setIsScannerVisible(!isScannerVisible);
  };

  return (
    <View style={styles.container}>
      <Title titulo="Segurança Patrimonial" />
      <TouchableOpacity style={styles.button} onPress={toggleScanner}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
      {isScannerVisible && (
        <QRCodeScannerComponent onQRCodeScanned={handleQRCodeScanned} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeSeguranca;
