// import AsyncStorage from '@react-native-async-storage/async-storage';

// const FORM_DATA_KEY = 'formData';

export const saveFormData = async (data) => {
  try {
    await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
    console.log('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    // Tratamento de erro (opcional)
  }
};

export const getFormData = async () => {
  try {
    const storedData = await AsyncStorage.getItem(FORM_DATA_KEY);
    console.log(storedData)
    // return storedData !== null ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    return null; // Ou lance um erro, dependendo da sua estratégia de tratamento
  }
};

export const updateFormData = async (data) => {
  try {
    const existingData = await getFormData();
    const updatedData = { ...existingData, ...data }; // Mescla os dados existentes com os novos
    await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(updatedData));
    console.log('Dados atualizados com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    // Tratamento de erro (opcional)
  }
};

export const deleteFormData = async (keyToDelete) => { // Adiciona o parâmetro keyToDelete
  try {
    const existingData = await getFormData();
    if (existingData) {
      delete existingData[keyToDelete]; // Remove a chave especificada
      await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(existingData));
      console.log(`Chave '${keyToDelete}' excluída com sucesso!`);
    } else {
      console.log('Nenhum dado encontrado para excluir.');
    }
  } catch (error) {
    console.error(`Erro ao excluir chave '${keyToDelete}':`, error);
    // Tratamento de erro (opcional)
  }
};
