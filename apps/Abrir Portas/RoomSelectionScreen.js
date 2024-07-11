import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Title, NormalText, ButtonGroup } from '../../components/FrontEndCR'; // Verifique se o caminho está correto

const RoomSelectionScreen = ({ navigation }) => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch('http://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/predios/');
        const data = await response.json();
        
        const formattedBuildings = data.map(building => ({
          label: building.nome,
          id: building.id
        }));

        setBuildings(formattedBuildings);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os prédios:', error);
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const fetchRooms = async (buildingId) => {
    try {
      setLoading(true);
      const response = await fetch('https://campusinteligente.ifsuldeminas.edu.br/dynamic-api/edificios/salas/');
      const data = await response.json();
      
      const formattedRooms = data
        .filter(room => room.predio === buildingId)
        .map(room => ({
          label: room.numero,
          screenName: 'AcessoPorBiometria', // Alterado para DetailScreen
          roomNumber: room.numero,
          buildingName: buildings.find(b => b.id === buildingId).label,
          status: room.aberta ? 'open' : 'closed'
        }));

      setRooms(formattedRooms);
      setSelectedBuilding(buildingId);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar as salas:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        {!selectedBuilding ? (
          <>
            <Title titulo="Selecione um prédio" />
            <NormalText texto="Você tem acesso aos seguintes prédios:" />
            <ButtonGroup
              buttons={buildings.map(building => ({
                ...building,
                onPress: () => fetchRooms(building.id)
              }))}
            />
          </>
        ) : (
          <>
            <Title titulo="Selecione uma sala" />
            <NormalText texto="Você tem acesso às seguintes salas:" />
            <ButtonGroup
              buttons={rooms.map(room => ({
                label: room.label,
                onPress: () => navigation.navigate(room.screenName, {
                  roomNumber: room.roomNumber,
                  buildingName: room.buildingName,
                  status: room.status // Passa o status da sala para DetailScreen
                }),
                color: room.status === 'open' ? '#4CAF50' : '#F44336'
              }))}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
});

export default RoomSelectionScreen;
