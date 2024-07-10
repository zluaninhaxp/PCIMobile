// Index.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Title, NormalText } from './components/FrontEndCR';
import ExpandableMenu from './ExpandableMenu'; // Certifique-se de ajustar o caminho conforme necessário

const HomeScreen = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Defina as rotas para os diferentes aplicativos
  const routes = [
    { label: 'Agrícola', screenName: 'HomeAgricola' },
    { label: 'Colabore', screenName: 'HomeColabore' },
    { label: 'Edifícios', screenName: 'HomeEdificios' },
    { label: 'Florestas', screenName: 'HomeFlorestas' },
    { label: 'Gestão de Projetos', screenName: 'HomeGP' },
    { label: 'Indústria', screenName: 'HomeIndustria' },
    { label: 'MIA', screenName: 'HomeMIA' },
    { label: 'Pecuária', screenName: 'HomePecuaria' },
    { label: 'Segurança', screenName: 'HomeSeguranca' },
    { label: 'Solicita', screenName: 'HomeSolicita' },
    { label: 'Sustentabilidade', screenName: 'HomeSustentabilidade' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={toggleMenu}>
          <Image
            source={require('./assets/toggle-menu.png')}
            style={styles.imagemHeader}
            resizeMode="cover"
          />
        </Pressable>
        <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
      <View style={styles.cardContainer}>
        <Image
          source={require('./assets/pci_logo.png')}
          style={styles.imagemPrincipal}
          resizeMode="cover"
        />
        <Title titulo="Programa Campus Inteligente" />
        <NormalText texto="Corpo do app (apps liberados e infos)" />
      </View>
      {isMenuOpen && <ExpandableMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} routes={routes} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4f4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 11.5,
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
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
  imagemHeader: {
    width: 30,
    height: 30,
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
    alignItems: 'center', // Alinha os itens no centro
    width: '100%', // Define a largura para 100%
    gap: 10,
    padding: 20,
  },
});

export default HomeScreen;
