import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function AddTodo({ setTodoList }) {
  const inputTextRef = useRef();
  const [todo, setTodo] = useState('');

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    inputTextRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (todo.trim() === '') {
      setTodo('');
      return inputTextRef.current.focus();
    }
    const newTodo = { title: todo, done: false };
    try {
      const response = await axiosInstance.post('/todo', newTodo);
      const data = await response.data;
      setTodoList((prev) => [...prev, data.result]);
      setTodo('');
      inputTextRef.current.focus();
      toast.success(data.message);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <div className="relative mt-10">
        <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512">
            <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </div>
        <input
          type="text"
          ref={inputTextRef}
          value={todo}
          className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white"
          placeholder="new todo item"
          onChange={handleChange}
          onKeyUp={handleKeyDown}
        />
      </div>
    </div>
  );
}

AddTodo.propTypes = {
  setTodoList: PropTypes.func,
};
