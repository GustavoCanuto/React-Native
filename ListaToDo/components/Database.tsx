import SQLite from 'react-native-sqlite-storage';
import {Todo} from './types';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

const dbParms = {
    name: 'TodoDB.db'
}

interface Database {
    executeSql: (sql: string, params?: any[]) => Promise<any>;
}

export const getDBConnection = async (): Promise<Database> => {
    try {
        const db = await SQLite.openDatabase(dbParms);
        console.log("Banco de dados aberto com sucesso");
        return db;
    } catch (error) {
        console.error(error);
        throw new Error('Falha ao abrir o banco de dados');
    }
};

export const createTable = async (db: Database) => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS todo_items (
            id TEXT NOT NULL PRIMARY KEY,
            text TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT 0
        )`;
        await db.executeSql(sql);
    } catch (error) {
        console.error(error);
        throw new Error('Falha ao criar tabela');
    }
};

export const addTodoItem = async (dbb: Database, tarefa: Todo): Promise<void> => {
    try {
        const sql = `INSERT INTO todo_items (id, text, done) VALUES (?, ?, ?)`;
        await dbb.executeSql(sql, [tarefa.id, tarefa.text, tarefa.done ? 1 : 0]);
    } catch (error) {
        console.error(error);
        throw new Error('Falha ao adicionar item');
    }
}

    export const getTodoItems = async (dbb: Database): Promise<Todo[]> => {
        const todos: Todo[] = [];
      
        try {
          const results = await dbb.executeSql('SELECT id, text, done FROM todo_items');
      
          const resultSet = results[0]; 
          const rows = resultSet.rows;
      
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            todos.push({
              id: item.id,
              text: item.text,
              done: item.done === 1,
            });
          }
      
          return todos;
        } catch (error) {
          console.error(error);
          throw new Error('Falha ao obter item');
        }
      };

export const updateTodoItem = async (dbb: Database, tarefa: Todo): Promise <void> => {

    try{
        const sql = 'UPDATE todo_items SET text = ?, done = ? WHERE id = ?';
        await dbb.executeSql(sql, [tarefa.text, tarefa.done ? 1 : 0, tarefa.id]);
    }catch (error){
        console.error(error);
        throw new Error('Falha ao atualizar item');

    }
}

export const deleteTodoItem = async (dbb: Database, tarefa: Todo): Promise <void> => {

    try{
        const sql = 'DELETE FROM todo_items WHERE id = ?';
        await dbb.executeSql(sql, [tarefa.id]);
    }catch (error){
        console.error(error);
        throw new Error('Falha ao deletar item');

    }
}

