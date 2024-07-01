import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

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
    <View style={styles.buttonContainer}>
      <Button title={label} onPress={onPress} color="#007BFF" />
    </View>
  );
};

const SecondaryButton = ({ label, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={label} onPress={onPress} color="#6C757D" />
    </View>
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
            <Button
              title={button.label}
              onPress={() => handleButtonPress(button.screenName)} // Passando apenas o nome da rota
              color={button.color || "#007BFF"}
            />
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