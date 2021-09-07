import React, { createRef } from "react";
import { Button } from "../Button/Button";
import "./NewTodoForm.scss";
import addNewTodo from "../../utils/addNewTodo";

const NewTodoInput = ({ handleSetTodoData, isDisabled, todoData }) => {
  // Adding ref to input field and it's label, so we can get the input value and also style label in "isInputEmpty()"
  const newTodoInput = createRef();
  const newTodoLabel = createRef();

  // Handler when user adds a new To do
  const handleAddNewTodo = (event) => {
    // Add only if newTodoInput has some value
    if (newTodoInput.current.value) {
      handleSetTodoData(addNewTodo(todoData, newTodoInput.current.value));
    } else alert("Your Todo input was empty, try again!");

    // Prevent form submit from reloading page
    event.preventDefault();

    // Reset input value
    newTodoInput.current.value = "";

    // Set focus back to input
    newTodoInput.current.focus();

    // Reset label style
    isInputEmpty();
  };

  // Change CSS classes of label, if input has values
  const isInputEmpty = () => {
    if (newTodoInput.current?.value === "") {
      newTodoLabel.current.className = "newTodo__form__input__label";
    } else {
      newTodoLabel.current.className = [
        "newTodo__form__input__label newTodo__form__input__label--moved",
      ];
    }
  };

  return (
    <form className="newTodo__form">
      <legend className="todo__legend">Add new task</legend>
      <div className="newTodo__form__elements">
        <div className="newTodo__form__input">
          <label
            ref={newTodoLabel}
            className="newTodo__form__input__label"
            id="newTodoLabel"
            htmlFor="newTodo_input"
          >
            Type your task here!
          </label>
          <input
            className="todo__input"
            ref={newTodoInput}
            type="text"
            disabled={isDisabled()}
            id="newTodo_input"
            aria-labelledby="newTodoLabel"
            onChange={isInputEmpty}
          />
        </div>
        <div className="newTodo__form__buttons">
          <Button
            aria-label="Add todo"
            type="submit"
            onClick={(e) => handleAddNewTodo(e)}
            disabled={isDisabled()}
            icon="add"
          />
          <Button
            aria-label="Reset input"
            icon="delete"
            type="reset"
            disabled={isDisabled()}
          />
        </div>
      </div>
    </form>
  );
};

export default NewTodoInput;
