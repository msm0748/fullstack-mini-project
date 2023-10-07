import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

export default function TodoList({ todoList, handleDelete }) {
  return (
    <ul className="block w-full pt-6">
      {todoList.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} handleDelete={handleDelete} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
};
