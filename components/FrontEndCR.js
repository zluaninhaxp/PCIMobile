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

const ButtonGroup = ({ buttons, navigation }) => {
  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName); // Passando o nome da rota como uma string
  };

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <View key={index} style={buttons.length === 1 ? styles.singleButton : styles.multiButton}>
          <Pressable
            onPress={() => handleButtonPress(button.screenName)} // Passando apenas o nome da rota
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
  },
  subTitle: {
    fontSize: 18,
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
});

export { Title, SubTitle, NormalText, PrimaryButton, SecondaryButton, ButtonGroup };
