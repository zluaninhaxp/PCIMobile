import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Title, NormalText, SubTitle, ImportantText } from '../../components/FrontEndCR';
import BiometricAuth from '../../components/BiometricAuth';
import BluetoothManager from '../../components/BluetoothManager';

const DetailScreen = ({ route, navigation }) => {
  const { roomNumber, buildingName, status, roomId, userId } = route.params; // Inclui userId
  const [doorOpen, setDoorOpen] = useState(null);
  const [triggerCommand, setTriggerCommand] = useState(false);
  const [command, setCommand] = useState('');

  useEffect(() => {
    const fetchRoomStatus = async () => {
      try {
        const response = await fetch(`https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/salas/${roomId}/`);
        if (response.ok) {
          const roomData = await response.json();
          setDoorOpen(roomData.aberta);
        } else {
          const errorData = await response.json();
          console.log('Erro na resposta da API:', errorData);
          Alert.alert('Erro', 'Falha ao buscar o status da porta.');
        }
      } catch (error) {
        console.log('Erro ao conectar com a API:', error);
        Alert.alert('Erro', 'Erro ao conectar com a API.');
      }
    };

    fetchRoomStatus();
  }, [roomId]);

  const updateDoorStatus = async (newOpenStatus) => {
    try {
      console.log(`Tentando atualizar o status da porta para: ${newOpenStatus}`);
      const response = await fetch(`https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/salas/${roomId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aberta: newOpenStatus }),
      });

      if (response.ok) {
        setDoorOpen(newOpenStatus);
        Alert.alert('Sucesso', `A porta foi ${newOpenStatus ? 'aberta' : 'fechada'} com sucesso!`);
        // Envia o comando Bluetooth ao ESP
        setCommand(newOpenStatus ? 'C' : 'F'); // 'C' para abrir, 'F' para fechar
        setTriggerCommand(true);
        // Navega para a tela RoomSelectionScreen e força a atualização
        navigation.navigate('RoomSelection', { userId, refresh: true, buildingName });
      } else {
        const errorData = await response.json();
        console.log('Erro na resposta da API:', errorData);
        Alert.alert('Erro', 'Falha ao atualizar o status da porta.');
      }
    } catch (error) {
      console.log('Erro ao conectar com a API:', error);
      Alert.alert('Erro', 'Erro ao conectar com a API.');
    }
  };

  const handleAuthSuccess = (isAuthenticated) => {
    if (isAuthenticated) {
      const newOpenStatus = !doorOpen;
      updateDoorStatus(newOpenStatus);
    }
  };

  if (doorOpen === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const statusTextColor = doorOpen ? '#4CAF50' : '#F44336';
  const doorActionText = doorOpen ? 'Feche a porta com biometria:' : 'Abra a porta com biometria:';

  return (
    <View style={styles.container}>
      <Title titulo={`Sala número ${roomNumber}`} />
      <SubTitle subTitulo={`${buildingName}`} />
      <ImportantText importantText={`Status: ${doorOpen ? 'Aberta' : 'Fechada'}`} />
      <Text style={[styles.statusText, { color: statusTextColor }]}>
        {doorOpen ? 'Sala Aberta' : 'Sala Fechada'}
      </Text>
      <NormalText texto={doorActionText} />
      <BiometricAuth onAuthSuccess={handleAuthSuccess} />
      <BluetoothManager 
        deviceMacAddress="D0:EF:76:33:68:4C" 
        command={command} 
        triggerCommand={triggerCommand} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  statusText: { fontSize: 18, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default DetailScreen;
