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
      <span
        onClick={() => {
          handleToggleTodoDone(item, index);
        }}
      >
        <button disabled={isDisabled()}>Check</button>
        <span className={!status ? "item_false" : "item_true"}>{task}</span>
      </span>

      <button
        onClick={() => {
          editThisTodo(index);
        }}
        disabled={isDisabled() | status}
      >
        Edit
      </button>
      <button
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
