import { useSelector } from "react-redux";

import { todosSelector } from "../../store/selectors/todo";
import { Todo } from "../todo";

export const TodoList = () => {
  const todos = useSelector(todosSelector);
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
