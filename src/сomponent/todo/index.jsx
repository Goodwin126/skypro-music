import React from "react";
import { useDispatch } from "react-redux";

import { toggleTodo } from "../../store/actions/creators/todo";

export const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const toggleTodoItem = () => {
    //функция которая будет отправлять в store действи toggleTodo, в который будем передавать id
    dispatch(toggleTodo(todo.id));
  };
  return (
    <li onClick={toggleTodoItem}>
      {todo.completed ? "👌" : "🫸"} <span>{todo.content}</span>
    </li>
  );
};
