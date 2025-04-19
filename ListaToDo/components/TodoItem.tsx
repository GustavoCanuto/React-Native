import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { Todo } from './types';

type TodoItemProps = {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onRemoveTodo, onEdit }) => {
  const [completed, setCompleted] = useState(false);
  const handleSwitch = (newValue: boolean) => {
    setCompleted(newValue);
    todo.done = newValue;
  }
  return (
    <View style={styles.container}>
            <Text style={[styles.text, completed && styles.completedText]}>
        {todo.text}
    </Text>
      <Switch
        style={[styles.checkbox, completed && styles.checked]}
        value={completed}
        onValueChange={
          handleSwitch
        }
      />

      {/* <Text>{isChecked ? 'Feito': 'Pendente'}</Text> */}

      {/* <TouchableOpacity>
        <Text>Feito</Text>
      </TouchableOpacity> */}
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
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'white',
  },
});

export default TodoItem;
