import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, Modal, TextInput, Button } from 'react-native';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Todo } from './components/types';
import {getDBConnection, createTable, addTodoItem, getTodoItems, updateTodoItem, deleteTodoItem} from './components/Database';
import { useEffect } from 'react';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editedText, seteditedText] = useState<string>('');
  const [editedTodo, setEditedTodo] = useState<Todo>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        const storedTodos = await getTodoItems(db);
        setTodos(storedTodos);
      } catch (error) {
        console.error('Erro ao carregar dados do banco:', error);
      }
    };
    loadData();
  }, []);

  const addTodo = async (todoText: string) => {
    if (todoText.length > 0) {
      const newTodo: Todo = {
        id: Math.random().toString(),
        text: todoText,
        done: false,
      };
        const db = await getDBConnection();
        await addTodoItem(db, newTodo);
        setTodos([...todos, newTodo]);
    } else {
      Alert.alert('Erro', 'Preencha uma tarefa', [{ text: 'OK' }]);
    }
  };

  const removeTodo = async (todoId: string) => {
      const db = await getDBConnection();
      const todo = todos.find(t => t.id === todoId);
      if (todo) {
        await deleteTodoItem(db, todo);
        setTodos(todos.filter(t => t.id !== todoId));
      }
  };

  const onEdit = (todo: Todo) => {
    setEditedTodo(todo);
    seteditedText(todo.text);
    setEditModalVisible(true);
  };
  

  const salvarEdited = async () => {
      const db = await getDBConnection();
      if (editedTodo) {
        const updatedTodo = { ...editedTodo, text: editedText };
        await updateTodoItem(db, updatedTodo);
        setTodos(
          todos.map(t => (t.id === editedTodo.id ? updatedTodo : t))
        );
      }
      setEditModalVisible(false);
  };

  const handleToggleDone = async (updatedTodo: Todo) => {
      const db = await getDBConnection();
      await updateTodoItem(db, updatedTodo);
      setTodos(todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  return (
    <View style={styles.container}>
      <AddTodo onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onRemoveTodo={removeTodo}
        onEdit={onEdit}
        onToggleDone={handleToggleDone}
      />

      <Modal visible={editModalVisible}>
        <View style={stylesModal.container}>
          <Text>Editando Tarefa</Text>
          <TextInput
            placeholder="Novo Texto"
            style={stylesModal.input}
            value={editedText}
            onChangeText={seteditedText}
          />
          <View style={stylesModal.containerButton}>
            <Button title="Salvar" onPress={salvarEdited} />
            <Button
              title="Cancelar"
              onPress={() => setEditModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginRight: 8,
    paddingVertical: 8,
    marginBottom: 20,
    width: '80%',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default App;
