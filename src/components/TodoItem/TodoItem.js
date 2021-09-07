import React from "react";
import "./TodoItem.scss";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

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
      <Checkbox
        status={status}
        isDisabled={isDisabled}
        handleToggleTodoDone={handleToggleTodoDone}
        item={item}
        index={index}
      />
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
