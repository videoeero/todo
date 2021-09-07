import React from "react";
import { Button } from "../Button/Button";

import "./TodoItemEditMode.scss";

const TodoItemEditMode = ({
  // Function to cancel editing
  cancelEdit,
  // Prop value to track what value is in editing input
  editTodoInputValue,
  // To handle input changes
  handleEditTodoInputValue,
  // To update edited task to list of Todos
  handleUpdateTodoTask,
  // To track index of todo in list
  index,
  // Original task before editing
  task,
}) => {
  return (
    <li className="todo__editMode">
      <span className="todo__editMode__input">
        <label htmlFor={`todo_${index}`}>Edit Todo</label>
        <input
          className="todo__input"
          type="text"
          id={`todo_${index}`}
          value={editTodoInputValue === undefined ? task : editTodoInputValue}
          onChange={(e) => handleEditTodoInputValue(e.target.value)}
        />
      </span>
      <span className="todo__editMode__buttons">
        <Button
          //Setting disabled if Input is empty or changes are not made
          disabled={editTodoInputValue === "" ? true : false}
          type="submit"
          onClick={(event) => {
            handleUpdateTodoTask(index, event);
          }}
          icon="editOk"
        />
        <Button icon="editCancel" onClick={() => cancelEdit()} />
      </span>
    </li>
  );
};

export default TodoItemEditMode;
