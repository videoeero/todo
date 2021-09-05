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
      <label htmlFor={`todo_${index}`}>Edit Todo</label>
      <input
        type="text"
        id={`todo_${index}`}
        value={editTodoInput === null ? task : editTodoInput}
        onChange={(e) => setEditTodoInput(e.target.value)}
      />
      <button
        //Setting disabled if Input is empty or changes are not made
        disabled={!editTodoInput ? true : false}
        type="submit"
        onClick={(e) => {
          handleEditTodo(index, task, e);
        }}
      >
        OK
      </button>
      <button onClick={() => cancelEdit()}>Cancel</button>
    </li>
  );
};

export default TodoItemEditMode;
