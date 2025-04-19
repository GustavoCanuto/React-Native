import React, {useState} from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { Todo } from './types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type TodoItemProps = {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onToggleDone: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onRemoveTodo, onEdit, onToggleDone }) => {
  const [completed, setCompleted] = useState(todo.done);
  const handleSwitch = (newValue: boolean) => {
    setCompleted(newValue);
    onToggleDone({ ...todo, done: newValue });
    //console.log("teste") usar  npx react-native log-android para visualizar
  }
  return (
    <View style={styles.container}>
            <Text style={[styles.text, completed && styles.completedText]}>
        {todo.text}
    </Text>

    <BouncyCheckbox
        fillColor="#4CAF50"
        iconStyle={styles.checkboxIcon}
        innerIconStyle={styles.checkboxIcon}
        style={[styles.checkbox]}
        isChecked={completed}
        onPress={handleSwitch}
      />
      {/* <Switch
        style={[styles.checkbox, completed && styles.checked]}
        value={completed}
        onValueChange={
          handleSwitch
        }
      /> */}

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
    marginRight: 10,
  },
  checkboxIcon: {
    borderRadius: 4,
  },
});


