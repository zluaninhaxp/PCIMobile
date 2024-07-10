import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Programa Campus Inteligente</Text>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>

      <Image
        source={require('./assets/pci_logo.png')} // Substitua pelo caminho da sua imagem
        style={styles.imagemPrincipal}
        resizeMode="cover"
      />

<Text style={styles.tituloAplicativos}>Aplicativos Liberados</Text> {/* Título adicionado */}

      <View style={styles.cardContainer}>
        <Text style={styles.card}>App 1</Text>
        <Text style={styles.card}>App 2</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '60%',
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagemPrincipal: {
    width: 150,
    height: 150,
  },
  tituloAplicativos: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    
    fontSize: 18,
    fontWeight: 'bold',

    marginBottom: 10,
    alignItems: 'center',
    borderTopWidth: 1, // Borda superior
    borderBottomWidth: 1, // Borda inferior
    borderColor: '#000', // Cor da borda (opcional)
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;