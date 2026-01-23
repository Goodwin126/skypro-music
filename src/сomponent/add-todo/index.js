import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/actions/creators/todo";

export const AddTodo = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const onInputChange = (evt) => {
    setValue(evt.target.value);
  };

  const handelAddTodo = () => {
    dispatch(addTodo(value));

    setValue("");
  };

  return (
    <div>
      <input type="text" value={value} onChange={onInputChange} />
      <button className="add-todo" onClick={handelAddTodo}>
        AddTodo
      </button>
    </div>
  );
};
