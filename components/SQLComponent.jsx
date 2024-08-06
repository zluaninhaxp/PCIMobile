import * as SQLite from 'expo-sqlite';

export const createDatabase = (databaseName) => { // Remove async e await
  try {
    const db = SQLite.openDatabase(databaseName); // Use SQLite.openDatabase diretamente
    console.log('Banco de dados criado/aberto com sucesso:', db);
    return db;
  } catch (error) {
    console.error('Erro ao criar/abrir o banco de dados:', error);
    throw error;
  }
};

export const createTable = (databaseName, tableName, fields) => { // Remove async e await
  try {
    const db = SQLite.openDatabase(databaseName); // Abra o banco de dados aqui

    // Cria a string SQL com base nos campos fornecidos
    const fieldsSQL = fields.map(([name, type]) => `${name} ${type}`).join(', ');
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${fieldsSQL}
    );`;

    db.transaction(tx => {
      tx.executeSql(sql, [], (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log('Tabela criada com sucesso:', tableName);
        } else {
          console.log('Tabela já existe:', tableName);
        }
      }, (error) => {
        console.error('Erro ao criar a tabela:', error);
        throw error;
      });
    });
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
    throw error;
  }
};


export const create = async (databaseName, tableName, fieldsAndValues) => {
  try {
    const db = await createDatabase(databaseName);

    // Verifica se a tabela existe
    const tableExists = await db.execAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    if (tableExists[0].rows.length === 0) {
      console.log('Tabela não existe:', tableName);
      return; // Encerra a função se a tabela não existir
    }

    const fields = fieldsAndValues.map(([field, _]) => field).join(', ');
    const placeholders = fieldsAndValues.map(() => '?').join(', ');
    const values = fieldsAndValues.map(([_, value]) => value);

    await db.runAsync(`INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`, values);
    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    throw error;
  }
};

export const read = async (databaseName, tableName, filterRule = null) => {
  try {
    const db = await createDatabase(databaseName);

    // Verifica se a tabela existe
    const tableExists = await db.execAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    if (tableExists[0].rows.length === 0) {
      console.log('Tabela não existe:', tableName);
      return; // Encerra a função se a tabela não existir
    }

    // Constrói a consulta SQL com base no filtro
    const sql = filterRule 
      ? `SELECT * FROM ${tableName} WHERE ${filterRule}` 
      : `SELECT * FROM ${tableName}`;

    const results = await db.getAllAsync(sql);
    if (results.length > 0) {
      return results.map(row => JSON.parse(row.data));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Erro ao ler dados:', error);
    throw error;
  }
};

export const update = async (databaseName, tableName, data, filterRule = null) => {
  try {
    const db = await createDatabase(databaseName);

    // Verifica se a tabela existe
    const tableExists = await db.execAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    if (tableExists[0].rows.length === 0) {
      console.log('Tabela não existe:', tableName);
      return; // Encerra a função se a tabela não existir
    }

    // Obtém os dados existentes (opcional)
    let existingData = null;
    if (!filterRule) { // Se não houver filtro, atualiza o primeiro registro
      const results = await db.getAllAsync(`SELECT * FROM ${tableName} LIMIT 1`);
      if (results.length > 0) {
        existingData = JSON.parse(results[0].data);
      }
    }

    // Mescla os dados existentes com os novos (se houver dados existentes)
    const updatedData = existingData ? { ...existingData, ...data } : data;

    // Constrói a consulta SQL com base no filtro
    const sql = filterRule
      ? `UPDATE ${tableName} SET data = ? WHERE ${filterRule}`
      : `UPDATE ${tableName} SET data = ? WHERE id = (SELECT MIN(id) FROM ${tableName})`; // Atualiza o primeiro registro se não houver filtro

    await db.runAsync(sql, [JSON.stringify(updatedData)]);
    console.log('Dados atualizados com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    throw error;
  }
};

export const Delete = async (databaseName, tableName, filterRule = null) => {
  try {
    const db = await createDatabase(databaseName);

    // Verifica se a tabela existe
    const tableExists = await db.execAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    if (tableExists[0].rows.length === 0) {
      console.log('Tabela não existe:', tableName);
      return; // Encerra a função se a tabela não existir
    }

    // Constrói a consulta SQL com base no filtro
    const sql = filterRule 
      ? `DELETE FROM ${tableName} WHERE ${filterRule}` 
      : `DELETE FROM ${tableName}`; // Deleta todos os registros se não houver filtro

    await db.execAsync(sql);
    console.log('Dados excluídos com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir dados:', error);
    throw error;
  }
};