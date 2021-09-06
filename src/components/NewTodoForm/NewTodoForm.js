import React from "react";
import { Button } from "../Button/Button";
import "./NewTodoForm.scss";

const NewTodoInput = ({ handleAddNewTodo, isDisabled, newTodoInput }) => {
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
