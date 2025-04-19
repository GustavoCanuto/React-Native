import React from 'react';
import { FlatList } from 'react-native';
import { Todo } from './types';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onRemoveTodo: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onToggleDone: (todo: Todo) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onRemoveTodo, onEdit, onToggleDone }) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onRemoveTodo={onRemoveTodo}
          onEdit={onEdit}
          onToggleDone={onToggleDone}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default TodoList;
