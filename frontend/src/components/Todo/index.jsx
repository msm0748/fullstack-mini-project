import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList';
import axiosInstance from '../../utils/axios';
import AddTodo from './AddTodo';

const date = new Date();
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'long',
};
const formattedDate = date.toLocaleDateString('ko-KR', options);

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get('/todos');
        setTodoList(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    const newTodo = todoList.filter((todo) => id !== todo.id);
    try {
      const response = await axiosInstance.delete(`/todo/${id}`);
      const data = await response.data;
      setTodoList(newTodo);
      toast.success(data.message);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-70">
      <ToastContainer
        position="bottom-right"
        autoClose={1200}
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
      <AddTodo setTodoList={setTodoList} />
      {isLoading && <div className="mt-3">loading...</div>}
      <TodoList todoList={todoList} handleDelete={handleDelete} setTodoList={setTodoList} />
    </div>
  );
}
