import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import { Title, NormalText, ButtonGroup } from '../../components/FrontEndCR';
import { useFocusEffect } from '@react-navigation/native';
import { NotificationOnApp } from '../../components/NotificationOnApp';

const RoomSelectionScreen = ({ navigation, route }) => {
  const { userId, refresh: forceRefresh, buildingName } = route.params; // Recebe buildingName
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('buildings');

  const fetchBuildingsAndAccess = useCallback(async () => {
    try {
      const buildingsResponse = await fetch('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/predios/');
      const accessResponse = await fetch('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/acessos/');
      const roomsResponse = await fetch('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/salas/');
      const buildingsData = await buildingsResponse.json();
      const accessData = await accessResponse.json();
      const roomsData = await roomsResponse.json();

      const userAccess = accessData.filter(item => item.user === parseInt(userId));

      if (userAccess.length > 0) {
        const accessibleRooms = userAccess[0].sala;

        const buildingsWithRooms = buildingsData.map(building => {
          const buildingRooms = roomsData.filter(room => room.predio === building.id);
          return { ...building, salas: buildingRooms.map(room => room.id) };
        });

        const accessibleBuildings = buildingsWithRooms.filter(building =>
          building.salas && building.salas.some(roomId => accessibleRooms.includes(roomId))
        );

        const formattedBuildings = accessibleBuildings.map(building => ({
          label: building.nome,
          id: building.id
        }));

        setBuildings(formattedBuildings);

        // Se buildingName estiver disponível, faça o fetch das salas correspondentes
        if (buildingName) {
          const building = formattedBuildings.find(b => b.label === buildingName);
          if (building) {
            fetchRooms(building.id);
          }
        }
      } else {
        Alert.alert('Erro', 'Nenhuma sala acessível encontrada para este usuário.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar os prédios e acessos:', error);
      Alert.alert('Erro', 'Erro ao buscar dados da API.');
      setLoading(false);
    }
  }, [userId, buildingName]);

  useFocusEffect(
    useCallback(() => {
      fetchBuildingsAndAccess();
    }, [fetchBuildingsAndAccess])
  );

  useEffect(() => {
    if (forceRefresh) {
      fetchBuildingsAndAccess();
    }
  }, [forceRefresh, fetchBuildingsAndAccess]);

  const fetchRooms = async (buildingId) => {
    try {
      setLoading(true);
      const response = await fetch('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/salas/');
      const data = await response.json();

      const userAccessResponse = await fetch('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/acessos/');
      const userAccessData = await userAccessResponse.json();
      const userAccess = userAccessData.filter(item => item.user === parseInt(userId));
      const accessibleRooms = userAccess.length > 0 ? userAccess[0].sala : [];

      const accessibleBuildingRooms = data
        .filter(room => room.predio === buildingId && accessibleRooms.includes(room.id))
        .map(room => ({
          label: room.numero,
          id: room.id,
          screenName: 'AcessoPorBiometria',
          roomNumber: room.numero,
          buildingName: buildings.find(b => b.id === buildingId).label,
          status: room.aberta ? 'open' : 'closed'
        }));

      setRooms(accessibleBuildingRooms);
      setSelectedBuilding(buildingId);
      setView('rooms');
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar as salas:', error);
      setLoading(false);
    }
  };

  const handleBackToBuildings = () => {
    setSelectedBuilding(null);
    setRooms([]);
    setView('buildings');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {view === 'rooms' && (
          <Text style={styles.headerText} onPress={handleBackToBuildings}>
            Voltar à seleção de prédios
          </Text>
        )}
        <Title titulo={view === 'buildings' ? "Selecione um prédio" : "Selecione uma sala"} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {view === 'buildings' ? (
          <>
            <NormalText texto="Você tem acesso aos seguintes prédios:" />
            {buildings.length > 0 ? (
              <ButtonGroup
                buttons={buildings.map(building => ({
                  ...building,
                  onPress: () => fetchRooms(building.id)
                }))}
              />
            ) : (
              <Text>Nenhum prédio acessível encontrado.</Text>
            )}
          </>
        ) : (
          <>
            <NormalText texto="Você tem acesso às seguintes salas:" />
            {rooms.length > 0 ? (
              <ButtonGroup
                buttons={rooms.map(room => ({
                  label: room.label,
                  onPress: () => navigation.navigate(room.screenName, {
                    roomNumber: room.roomNumber,
                    buildingName: room.buildingName,
                    status: room.status,
                    roomId: room.id,
                    userId // Passa o ID do usuário para a DetailScreen
                  }),
                  color: room.status === 'open' ? '#4CAF50' : '#F44336'
                }))}
              />
            ) : (
              <Text>Nenhuma sala acessível encontrada.</Text>
            )}
          </>
        )}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default RoomSelectionScreen;
