import React from "react";
import { Button } from "../Button/Button";
import "./NewTodoForm.scss";

const NewTodoInput = ({ handleAddNewTodo, isDisabled, newTodoInput }) => {
  return (
    <form className="newTodo__form">
      <legend className="todo__legend">Add new Todo</legend>
      <input
        className="todo__input"
        ref={newTodoInput}
        type="text"
        disabled={isDisabled()}
      />

      <Button
        type="submit"
        onClick={(e) => handleAddNewTodo(e)}
        disabled={isDisabled()}
        icon="add"
      />

      <Button icon="delete" type="reset" disabled={isDisabled()} />
    </form>
  );
};

export default NewTodoInput;
