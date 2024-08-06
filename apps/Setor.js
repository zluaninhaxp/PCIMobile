import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Setor() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página de Setor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
