import React from "react";
import "./TodoItem.scss";

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
    <li>
      <span>
        <input
          checked={!status ? false : true}
          type="checkbox"
          id={`todo_${index}`}
          disabled={isDisabled()}
          onChange={() => {
            handleToggleTodoDone(item, index);
          }}
        />
        <label
          className={!status ? "item_false" : "item_true"}
          htmlFor={`todo_${index}`}
        >
          {task}
        </label>
      </span>

      <button
        aria-label={`Edit Todo ${task}`}
        onClick={() => {
          handleEditTodoByIndex(index);
        }}
        disabled={isDisabled() | status}
      >
        Edit
      </button>
      <button
        aria-label={`Delete Todo ${task}`}
        onClick={() => {
          handleDeleteTodo(index);
        }}
        disabled={isDisabled() | !status}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
