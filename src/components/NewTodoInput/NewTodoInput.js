import React from "react";

const NewTodoInput = ({ handleAddNewTodo, isDisabled, newTodoInput }) => {
  return (
    <div>
      <input ref={newTodoInput} type="text" disabled={isDisabled()} />
      <button onClick={handleAddNewTodo} disabled={isDisabled()}>
        Add new todo
      </button>
    </div>
  );
};

export default NewTodoInput;
