import React from "react";

const TodoItemEditMode = ({
  cancelEdit,
  editTodoInput,
  task,
  setEditTodoInput,
  handleEditTodo,
  index,
}) => {
  return (
    <li>
      {console.log("rendered")}
      <input
        type="text"
        value={editTodoInput === null ? task : editTodoInput}
        onChange={(e) => setEditTodoInput(e.target.value)}
      />
      <button
        onClick={() => {
          handleEditTodo(index, task);
        }}
      >
        OK
      </button>
      <button onClick={() => cancelEdit()}>Cancel</button>
    </li>
  );
};

export default TodoItemEditMode;
