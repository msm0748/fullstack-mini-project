import React from 'react';
import PropTypes from 'prop-types';

export default function TodoItem({ todo, index, handleDelete }) {
  return (
    <li className="w-full border-2 rounded-xl mt-2 hover:border-blue-300">
      <input id={index} type="checkbox" className="float-left block w-6 h-6 m-3" />
      <button
        onClick={() => handleDelete(todo.id)}
        className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105 flex align-center justify-center"
      >
        x
      </button>
      <label htmlFor={index} className="block w-full p-3">
        {todo.content}
      </label>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  handleDelete: PropTypes.func,
};
