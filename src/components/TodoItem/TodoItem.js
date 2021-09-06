import React from "react";
import "./TodoItem.scss";
import { Button } from "../Button/Button";

const TodoItem = ({
  // Handler for toggling Todo done status
  handleToggleTodoDone,
  // Single todo data
  item,
  // Index of this todo
  index,
  // Set form element disabled if needed
  isDisabled,
  // Call handler to set Todo to editing mode
  handleEditTodoByIndex,
  // Call handler to delete todo
  handleDeleteTodo,
}) => {
  const { task, status } = item;

  return (
    <li className="todo__item">
      <span className="todo__item__span">
        <input
          className="todo__checkbox"
          checked={!status ? false : true}
          type="checkbox"
          id={`todo_${index}`}
          disabled={isDisabled()}
          onChange={() => {
            handleToggleTodoDone(item, index);
          }}
        />
        <label
          className={
            !status
              ? "todo__label todo__label--notdone"
              : "todo__label todo__label--done"
          }
          htmlFor={`todo_${index}`}
        >
          {task}
        </label>
      </span>
      <span className="todo__item__buttons">
        <Button
          aria-label={`Edit Todo ${task}`}
          onClick={() => {
            handleEditTodoByIndex(index, task);
          }}
          disabled={isDisabled() | status}
          icon="edit"
        />

        <Button
          aria-label={`Delete Todo ${task}`}
          onClick={() => {
            handleDeleteTodo(index);
          }}
          disabled={isDisabled() | !status}
          icon="delete"
        />
      </span>
    </li>
  );
};

export default TodoItem;
