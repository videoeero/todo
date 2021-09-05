import React from "react";
import "./TodoItem.scss";

const TodoItem = ({
  handleToggleTodoDone,
  item,
  index,
  isDisabled,
  editThisTodo,
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
          editThisTodo(index);
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
