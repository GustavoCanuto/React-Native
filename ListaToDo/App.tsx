import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, Modal, TextInput, Button } from 'react-native';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Todo } from './components/types';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editedText, seteditedText] = useState<string>('');
  const [editedTodo, setEditedTodo] = useState<Todo>();

  const addTodo = (todoText: string) => {

    if (todoText.length > 0) {
      setTodos([...todos, { id: Math.random().toString(), text: todoText }]);
    } else {
      Alert.alert("Erro"
        , "Preencha uma tarefa"
        , [{
          text: "OK"
        }])
    }
  };

  const removeTodo = (todoId: string) => {
    setTodos([...todos.filter(i => i.id !== todoId)]);
  };

  const onEdit = (todo: Todo) => {
    setEditedTodo(todo);
    seteditedText(todo.text);
    setEditModalVisible(true);
  };

  const salvarEdited = () => {
    setTodos([...todos.map(i => {
      if(i.id === editedTodo?.id){
        return {...i, text: editedText};
      }
      return i;
    })])
     setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <AddTodo onAddTodo={addTodo} />
      <TodoList todos={todos} onRemoveTodo={removeTodo} onEdit={onEdit} />

      <Modal visible = {editModalVisible}>
        <View style={stylesModal.container} >
          <Text>Editando Tarefas</Text>
          <TextInput
           placeholder='Novo Texto' 
           style={stylesModal.input}
           value={editedText}
           onChangeText={seteditedText}
           ></TextInput>
         <View style={stylesModal.containerButton}>
          <Button title='Salvar' onPress={() => salvarEdited()}></Button>
          <Button title='Cancelar' onPress={()=> setEditModalVisible(false)}></Button>
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
    width: '60%'
  }
});

export default App;
