import React from "react";
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

  // To handle and track changes in Editing mode
  handleEditTodoInputValue,
  editTodoInputValue,
}) => {
  // Handler for deleting todos from list
  const handleDeleteTodo = (itemIndexToRemoved) => {
    handleSetTodoData(deleteTodo(todoData, itemIndexToRemoved));
  };

  // Cancelling editing mode without updating changes
  const cancelEdit = () => {
    handleEditTodoInputValue("");
    handleEditTodoByIndex(false);
  };

  // Handler to toggle if Todo at certain index is done or not
  const handleToggleTodoDone = (item, index) => {
    handleSetTodoData(toggleTodoDone(todoData, item, index));
  };

  // Handler to update edited todo
  const handleUpdateTodoTask = (index, event) => {
    // Preventing page refresh on submit
    event.preventDefault();

    // Calling handler to set editing mode off
    handleEditTodoByIndex(false);

    // Calling handler
    handleSetTodoData(updateTodoTask(editTodoInputValue, todoData, index));

    // // Reseting state of EditTodoInputValue
    handleEditTodoInputValue("");
  };

  return (
    <div className="todo__list">
      <fieldset className="todo__fieldset">
        <legend className="todo__legend">Tasks to do</legend>
        {todoData.map((item, index) =>
          editTodoByIndex === index ? (
            <TodoItemEditMode
              key={`editItem_${index}`}
              index={index}
              handleUpdateTodoTask={handleUpdateTodoTask}
              handleEditTodoInputValue={handleEditTodoInputValue}
              cancelEdit={cancelEdit}
              task={item.task}
              editTodoInputValue={editTodoInputValue}
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
    </div>
  );
};

export default TodoList;
