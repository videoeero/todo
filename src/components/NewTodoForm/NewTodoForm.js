import React, { createRef } from "react";
import { Button } from "../Button/Button";
import "./NewTodoForm.scss";
import addNewTodo from "../../utils/addNewTodo";

const NewTodoInput = ({ handleSetTodoData, isDisabled, todoData }) => {
  // Adding ref to input field, so we can
  const newTodoInput = createRef();

  // Handler when user adds a new Todo
  const handleAddNewTodo = (event) => {
    // Append added Todo to existing list and update state

    if (newTodoInput.current.value) {
      handleSetTodoData(addNewTodo(todoData, newTodoInput.current.value));
    } else alert("Your Todo input was empty, try again!");

    // Prevent form submit from reloading page
    event.preventDefault();

    // Reset input value
    newTodoInput.current.value = "";
  };

  return (
    <form className="newTodo__form">
      <legend className="todo__legend">Add new Todo</legend>
      <div className="newTodo__form__elements">
        <div className="newTodo__form__input">
          <input
            className="todo__input"
            ref={newTodoInput}
            type="text"
            disabled={isDisabled()}
            id="newTodo_input"
          />
          <label
            className="newTodo__form__input__label"
            htmlFor="newTodo_input"
          >
            Type in your Todo!
          </label>
        </div>
        <div className="newTodo__form__buttons">
          <Button
            type="submit"
            onClick={(e) => handleAddNewTodo(e)}
            disabled={isDisabled()}
            icon="add"
          />
          <Button icon="delete" type="reset" disabled={isDisabled()} />
        </div>
      </div>
    </form>
  );
};

export default NewTodoInput;
