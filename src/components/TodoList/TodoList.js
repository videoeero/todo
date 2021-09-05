import React, { useState } from "react";
import deleteTodo from "../../utils/deleteTodo";
import toggleTodoDone from "../../utils/toggleTodoDone";
import updateTodoTask from "../../utils/updateTodoTask";
import TodoItemEditMode from "../TodoItemEditMode/TodoItemEditMode";
import TodoItem from "../TodoItem/TodoItem";

import "./TodoList.scss";

const TodoList = ({
  // Todo data to display
  todoData,
  //Handler for setting todos
  handleSetTodoData,
  // Set form element disabled if needed
  isDisabled,
  // handler for setting single todo to editing mode
  handleEditTodoByIndex,

  // Prop for displaying todo at index to editing mode
  editTodoByIndex,
}) => {
  // State to store what value is in textinput while editing
  const [editTodoInput, setEditTodoInput] = useState(null);

  // Handler for deleting todos from list
  const handleDeleteTodo = (itemIndexToRemoved) => {
    handleSetTodoData(deleteTodo(todoData, itemIndexToRemoved));
  };

  // Cancelling editing mode without updating changes
  const cancelEdit = () => {
    // setEditTodoInput(null);
    handleEditTodoByIndex(false);
  };

  // Handler to toggle if Todo at certain index is done or not
  const handleToggleTodoDone = (item, index) => {
    handleSetTodoData(toggleTodoDone(todoData, item, index));
  };

  // Handler to update edited todo
  const handleEditTodo = (index, originalTask, event) => {
    // Preventing page refresh
    event.preventDefault();

    // Calling handler to set editing mode off
    handleEditTodoByIndex(false);

    // Calling handler
    handleSetTodoData(updateTodoTask(editTodoInput, todoData, index));

    // Reseting state of EditTodoinput
    setEditTodoInput(null);
  };

  return (
    <form>
      <fieldset>
        <legend>Your Todos</legend>
        {todoData.map((item, index) =>
          editTodoByIndex === index ? (
            <TodoItemEditMode
              key={`editItem_${index}`}
              index={index}
              handleEditTodo={handleEditTodo}
              setEditTodoInput={setEditTodoInput}
              editTodoInput={editTodoInput}
              cancelEdit={cancelEdit}
              task={item.task}
            />
          ) : (
            <TodoItem
              key={`editItem_${index}`}
              item={item}
              handleToggleTodoDone={handleToggleTodoDone}
              isDisabled={isDisabled}
              index={index}
              handleEditTodoByIndex={handleEditTodoByIndex}
              handleDeleteTodo={handleDeleteTodo}
            />
          )
        )}
      </fieldset>
    </form>
  );
};

export default TodoList;
