import React from "react";

const NewTodoInput = ({
  handleAddNewTodo,
  isDisabled,
  newTodoInput,
  editMode,
}) => {
  return (
    <div>
      <form>
        <legend>Add new Todo</legend>
        <input ref={newTodoInput} type="text" disabled={isDisabled()} />
        <button
          type="submit"
          onClick={(e) => handleAddNewTodo(e)}
          disabled={isDisabled()}
        >
          Add
        </button>
        <button type="reset" disabled={isDisabled()}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default NewTodoInput;
