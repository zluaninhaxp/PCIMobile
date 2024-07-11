import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, NormalText, SubTitle, ImportantText } from '../../components/FrontEndCR';
import BiometricAuth from '../../components/BiometricAuth';

const DetailScreen = ({ route }) => {
  const { roomNumber, buildingName, status } = route.params;
  const doorActionText = status === 'open' ? 'Feche a porta com biometria:' : 'Abra a porta com biometria:';

  return (
    <View style={styles.container}>
      <Title titulo={`Sala número ${roomNumber}`} />
      <SubTitle subTitulo={`${buildingName}`} />
      <ImportantText importantText={`Status: ${status === 'open' ? 'aberta' : 'fechada'}`} status={status} />
      <NormalText texto={doorActionText} />
      <BiometricAuth />
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
});

export default DetailScreen;
