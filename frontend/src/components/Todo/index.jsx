import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList';
import axios from 'axios';

const date = new Date();
const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
const formattedDate = date.toLocaleDateString('ko-KR', options);

export default function Todo() {
  const inputTextRef = useRef();
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const notify = () => toast.success('삭제 되었습니다.!');

  useEffect(() => {
    inputTextRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSubmit();
    }
  };

  const handleDelete = (id) => {
    const newTodo = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodo);
    notify();
  };

  const handleSubmit = async () => {
    if (todo.trim() === '') {
      setTodo('');
      return inputTextRef.current.focus();
    }
    const id = +new Date();
    const newTodo = { title: todo, done: false };
    try {
      const response = await axios.post('http://localhost:8000/todos', {
        newTodo,
      });
      console.log(response);
      setTodoList((prev) => [...prev, newTodo]);
      setTodo('');
      inputTextRef.current.focus();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-70">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
        <div className="w-full p-3">
          <p className="text-3xl text-gray-600">Todo List</p>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </div>

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

      <TodoList todoList={todoList} handleDelete={handleDelete} />
    </div>
  );
}
