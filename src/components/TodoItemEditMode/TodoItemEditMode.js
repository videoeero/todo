import React from "react";
import { Button } from "../Button/Button";

import "./TodoItemEditMode.scss";

const TodoItemEditMode = ({
  cancelEdit,
  editTodoInput,
  task,
  setEditTodoInput,
  handleEditTodo,
  index,
}) => {
  return (
    <li className="todo__editMode">
      <span className="todo__editMode__span">
        <label htmlFor={`todo_${index}`}>Edit Todo</label>
        <input
          className="todo__input"
          type="text"
          id={`todo_${index}`}
          value={editTodoInput === null ? task : editTodoInput}
          onChange={(e) => setEditTodoInput(e.target.value)}
        />
      </span>
      <span>
        <Button
          //Setting disabled if Input is empty or changes are not made
          disabled={editTodoInput === "" ? true : false}
          type="submit"
          onClick={(event) => {
            handleEditTodo(index, event);
          }}
          icon="editOk"
        />
        <Button icon="editCancel" onClick={() => cancelEdit()} />
      </span>
    </li>
  );
};

export default TodoItemEditMode;
