import React from 'react';
import { FlatList } from 'react-native';
import TodoItem from './TodoItem';
import { Todo } from './types';

type TodoListProps = {
  todos: Todo[];
  onRemoveTodo: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onRemoveTodo, onEdit }) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <TodoItem todo={item} onRemoveTodo={onRemoveTodo} onEdit={onEdit} />}
      keyExtractor={item => item.id}
    />
  );
};

export default TodoList;
