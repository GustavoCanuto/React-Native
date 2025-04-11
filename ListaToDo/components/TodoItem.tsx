import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Todo } from './types';

type TodoItemProps = {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onRemoveTodo, onEdit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{todo.text}</Text>
      <Button title="EXCLUIR" onPress={() => onRemoveTodo(todo.id)} />
      <Button title="Editar" onPress={() => onEdit(todo)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  text: {
    flex: 1,
  },
});

export default TodoItem;
