import AsyncStorage from '@react-native-async-storage/async-storage';

const FORM_DATA_KEY = 'formData';

export const saveFormData = async (data) => {
  try {
    await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
    console.log('Dados salvos com sucesso!');
    console.log('TA DANDO CERTO PATRÃO')
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    // Tratamento de erro (opcional)
  }
};