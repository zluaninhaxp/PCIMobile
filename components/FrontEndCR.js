import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Title = ({ titulo }) => {
  return <Text style={styles.title}>{titulo}</Text>;
};

const SubTitle = ({ subTitulo }) => {
  return <Text style={styles.subTitle}>{subTitulo}</Text>;
};

const NormalText = ({ texto }) => {
  return <Text style={styles.normalText}>{texto}</Text>;
};

const ImportantText = ({ importantText, status }) => {
  let statusTextColor = '#000000'; // Cor padrão preto

  if (status === 'open') {
    statusTextColor = '#4CAF50'; // Verde para aberto
  } else if (status === 'closed') {
    statusTextColor = '#F44336'; // Vermelho para fechado
  }

  return <Text style={[styles.importantText, { color: statusTextColor }]}>{importantText}</Text>;
};

const PrimaryButton = ({ label, onPress }) => {
  return (
    <Pressable style={[styles.buttonContainer, styles.primaryButton]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const SecondaryButton = ({ label, onPress }) => {
  return (
    <Pressable style={[styles.buttonContainer, styles.secondaryButton]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const ButtonGroup = ({ buttons }) => {
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <View key={index} style={buttons.length === 1 ? styles.singleButton : styles.multiButton}>
          <Pressable
            onPress={button.onPress}
            style={[styles.buttonContainer, { backgroundColor: button.color || "#007BFF" }]}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    marginVertical: 5,
  },
  normalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007BFF',
  },
  secondaryButton: {
    backgroundColor: '#6C757D',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  singleButton: {
    margin: 10,
    width: '80%',
  },
  multiButton: {
    margin: 10,
    width: '40%',
  },
  importantText: {
    fontSize: 18,
    textAlign: 'center', // Ajuste conforme necessário
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export { Title, SubTitle, NormalText, PrimaryButton, SecondaryButton, ButtonGroup, ImportantText };
