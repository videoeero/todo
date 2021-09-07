import React, { useEffect, createRef } from "react";
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
  const editTodoInput = createRef();

  useEffect(() => {
    // Set focus back to edit input
    editTodoInput.current.focus();
  }, [editTodoInput]);

  return (
    <li>
      <form className="todo__editMode">
        <span className="todo__editMode__input">
          <label htmlFor={`todo_${index}`}>Edit Todo</label>
          <input
            ref={editTodoInput}
            className="todo__input"
            type="text"
            id={`todo_${index}`}
            value={editTodoInputValue === undefined ? task : editTodoInputValue}
            onChange={(e) => handleEditTodoInputValue(e.target.value)}
          />
        </span>
        <span className="todo__editMode__buttons">
          <Button
            aria-label="Update to do"
            disabled={editTodoInputValue === "" ? true : false}
            type="submit"
            onClick={(event) => {
              handleUpdateTodoTask(index, event);
            }}
            icon="editOk"
          />
          <Button icon="editCancel" onClick={() => cancelEdit()} />
        </span>
      </form>
    </li>
  );
};

export default TodoItemEditMode;
